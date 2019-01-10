/* tslint:disable */
import * as React from 'react';
import * as PropChecks from 'prop-checks';
const diff = require('deep-diff');
function extendWithDefined(oldObj: any, newObj: any) {
    Object.keys(newObj).forEach((key) => {
        if (typeof newObj[key] !== 'undefined') {
            oldObj[key] = newObj[key];
        }
    });
    return oldObj;
}
interface Props {
    [propName: string]: any;
}
export default function (Consumer: any) {
    return function (mapStateToProps: any) {
        return function (App: any) {
            const preset = extendWithDefined({
                startRequest: function () {
                    return <div>开始请求</div>
                },
                waitRequest: function (waitRequests: any) {
                    return <div>还在请求{waitRequests.join(', ')}</div>
                },
                typeError: function (messages: any) {
                    return <div>
                        因为类型{messages.join(',')}不满足要求，无法进行渲染</div>
                },
            }, {
                startRequest: App.startRequest,
                waitRequest: App.waitRequest,
                typeError: App.typeError,
                autoActions: App.autoActions,
                requireProps: App.requireProps,
            });
            if (preset.autoActions) {
                preset.autoActions = preset.autoActions.map((action: any) => {
                    if (typeof action === 'string') {
                        return {
                            name: action,
                            message: action
                        }
                    }
                    return action;
                });
            }
            return class ConnectComponent extends React.Component<Props> {
                store: any = null
                oldLoadingComponent = null
                constructor (props: any) {
                    super(props);
                    if (preset.autoActions) {
                        this.requested = false;
                    }
                }
                baseGet(object: any, path: any) {
                    path = path.split('.');
                    let index = 0
                    const length = path.length
                    while (object != null && index < length) {
                        object = object[path[index++]]
                    }
                    return (index && index == length) ? object : undefined
                }
                requested = true
                willRequestAction: any = new Set();
                oldRequestParams: any = {};
                handleParams(params: any, props: any) {
                    props = this.fillProps(props);
                    if (params) {
                        const newParams: any = {};
                        Object.keys(params).forEach((path) => {
                            const reg1 = /\{(?:[^\}\{]*)\}/g;
                            const reg = /\{([^\}\{]*)\}/g;
                            const value = params[path];
                            if (typeof value === 'string') {
                                const result = reg1.exec(value);
                                if (result) {
                                    newParams[path] = value.replace(reg, (match, key) => {
                                        return this.baseGet(props, key)
                                    });
                                } else {
                                    newParams[path] = value;
                                }
                            } else if (typeof value === 'function') {
                                newParams[path] = value(props);
                            }
                        })
                        return newParams;
                    }
                    return params;
                }
                componentWillReceiveProps(props: any) {
                    let ok = diff(props, this.props);
                    const willRequestActions: any = [];
                    Object.keys(this.oldRequestParams).forEach((actionName) => {
                        const actionParams = this.oldRequestParams[actionName];
                        const newParamValue = this.handleParams(actionParams[0], props);
                        if (diff(newParamValue, actionParams[1])) {
                            willRequestActions.push(actionName);
                        }
                    });
                    if (preset.requireProps && this.store && (ok || willRequestActions.length)) {
                        // 对props做处理
                        willRequestActions.forEach((actionName: any) => {
                            const params = this.handleParams(this.oldRequestParams[actionName][0], props);
                            this.oldRequestParams[actionName] = [this.oldRequestParams[actionName][0], params];
                            this.store.dispatch(actionName, params);
                        });
                    }
                }
                setStore(store: any) {
                    this.store = store;
                }
                fillProps(props: any) {
                    let newProps: any = {};
                    if (this.props.location) {
                        const search = this.props.location.search;
                        if (search.trim() !== '') {
                            const searchObj = search.substring('1').split('&');
                            searchObj.forEach((value: any) => {
                                const temp = value.split('=');
                                newProps[temp[0]] = temp[1];
                            })
                        }
                    }
                    if (this.props.match) {
                        newProps = {
                            ...newProps,
                            ...this.props.match.params
                        }
                    }
                    return {
                        ...newProps,
                        ...props,
                    };
                }
                
                render() {
                    return <Consumer>
                        {
                            (store: any) => {
                                this.setStore(store);
                                if (!this.requested) {
                                    preset.autoActions.forEach((action: any) => {
                                        const params = this.handleParams(action.params, this.props);
                                        this.oldRequestParams[action.name] = [action.params, params];
                                        store.dispatch(action.name, params);
                                        this.willRequestAction.add(action.name);
                                    })
                                    this.requested = true;
                                    return this.oldLoadingComponent = preset.startRequest();
                                } else if (this.willRequestAction.size > 0 && !store.isLoading) {
                                    this.willRequestAction.delete(store.reason)
                                    if (this.willRequestAction.size !== 0) {
                                        return this.oldLoadingComponent = preset.waitRequest(Array.from(this.willRequestAction));
                                    }
                                }
                                const newProps = mapStateToProps(store.store, store.loading);
                                const result = {
                                    ...this.fillProps(this.props),
                                    ...newProps,
                                    dispatch: store.dispatch,
                                    commit: store.commit
                                }
                                if (preset.requireProps) {
                                    const checkResults = PropChecks.checkPropTypes(preset.requireProps, result, 'prop', App.name);
                                    if (checkResults.length > 0) {
                                        if (store.isLoading) {
                                            return this.oldLoadingComponent;
                                        } else {
                                            const messages: any= [];
                                            checkResults.forEach((type: any) => {
                                                messages.push(type.name);
                                            });
                                            return preset.typeError(messages);
                                        }
                                    }
                                }
                                return <App {...result}></App>;
                            }
                        }
                    </Consumer>
                }
            }
        }
    }
}