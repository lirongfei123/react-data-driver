'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');
var PropChecks = require('prop-checks');

/*! *****************************************************************************
Copyright (c) Microsoft Corporation. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0

THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.

See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */
/* global Reflect, Promise */

var extendStatics = function(d, b) {
    extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return extendStatics(d, b);
};

function __extends(d, b) {
    extendStatics(d, b);
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}

var __assign = function() {
    __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};

function __awaiter(thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

function __generator(thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
}

function innerCreateProvider (Provider, store) {
    return /** @class */ (function (_super) {
        __extends(WrapProvider, _super);
        function WrapProvider(props) {
            var _this = _super.call(this, props) || this;
            _this.state = null;
            _this.state = {
                store: store.getState(),
                reason: 'init',
                loading: {}
            };
            store.subscribe(function (store, reason, loading, isLoading) {
                _this.setState({
                    store: store,
                    reason: reason,
                    loading: loading,
                    isLoading: isLoading
                });
            });
            return _this;
        }
        WrapProvider.prototype.render = function () {
            var props = {
                commit: store.commit.bind(store),
                dispatch: store.dispatch.bind(store),
                store: this.state.store,
                state: this.state.store,
                reason: this.state.reason,
                loading: this.state.loading,
                isLoading: this.state.isLoading
            };
            return React.createElement(Provider, { value: props }, this.props.children);
        };
        return WrapProvider;
    }(React.Component));
}

var diff = require('deep-diff');
function extendWithDefined(oldObj, newObj) {
    Object.keys(newObj).forEach(function (key) {
        if (typeof newObj[key] !== 'undefined') {
            oldObj[key] = newObj[key];
        }
    });
    return oldObj;
}
function innerCreateConnect (Consumer) {
    return function (mapStateToProps) {
        return function (App) {
            var preset = extendWithDefined({
                startRequest: function () {
                    return React.createElement("div", { style: { textAlign: 'center' } }, "\u5F00\u59CB\u8BF7\u6C42");
                },
                waitRequest: function (waitRequests) {
                    return React.createElement("div", { style: { textAlign: 'center' } }, "\u52A0\u8F7D\u4E2D...");
                },
                typeError: function (messages) {
                    return React.createElement("div", null,
                        "\u56E0\u4E3A\u7C7B\u578B",
                        messages.join(','),
                        "\u4E0D\u6EE1\u8DB3\u8981\u6C42\uFF0C\u65E0\u6CD5\u8FDB\u884C\u6E32\u67D3");
                }
            }, {
                startRequest: App.startRequest,
                waitRequest: App.waitRequest,
                typeError: App.typeError,
                autoActions: App.autoActions,
                requireProps: App.requireProps
            });
            if (preset.autoActions) {
                preset.autoActions = preset.autoActions.map(function (action) {
                    if (typeof action === 'string') {
                        return {
                            name: action,
                            message: action
                        };
                    }
                    return action;
                });
            }
            return /** @class */ (function (_super) {
                __extends(ConnectComponent, _super);
                function ConnectComponent(props) {
                    var _this = _super.call(this, props) || this;
                    _this.store = null;
                    _this.oldLoadingComponent = null;
                    _this.requested = true;
                    _this.willRequestAction = new Set();
                    _this.oldRequestParams = {};
                    if (preset.autoActions) {
                        _this.requested = false;
                    }
                    return _this;
                }
                ConnectComponent.prototype.baseGet = function (object, path) {
                    path = path.split('.');
                    var index = 0;
                    var length = path.length;
                    while (object != null && index < length) {
                        object = object[path[index++]];
                    }
                    return (index && index == length) ? object : undefined;
                };
                ConnectComponent.prototype.handleParams = function (params, props) {
                    var _this = this;
                    props = this.fillProps(props);
                    if (params) {
                        if (typeof params === 'function') {
                            return params(props);
                        }
                        else {
                            var newParams_1 = {};
                            Object.keys(params).forEach(function (path) {
                                var reg1 = /\{(?:[^\}\{]*)\}/g;
                                var reg = /\{([^\}\{]*)\}/g;
                                var value = params[path];
                                if (typeof value === 'string') {
                                    var result = reg1.exec(value);
                                    if (result) {
                                        newParams_1[path] = value.replace(reg, function (match, key) {
                                            return _this.baseGet(props, key);
                                        });
                                    }
                                    else {
                                        newParams_1[path] = value;
                                    }
                                }
                                else if (typeof value === 'function') {
                                    newParams_1[path] = value(props);
                                }
                                else {
                                    newParams_1[path] = params[path];
                                }
                            });
                            return newParams_1;
                        }
                    }
                    return params;
                };
                ConnectComponent.prototype.componentWillReceiveProps = function (props) {
                    var _this = this;
                    var willRequestActions = [];
                    Object.keys(this.oldRequestParams).forEach(function (actionName) {
                        var actionParams = _this.oldRequestParams[actionName];
                        var newParamValue = _this.handleParams(actionParams[0], props);
                        if (diff(newParamValue, actionParams[1])) {
                            willRequestActions.push(actionName);
                        }
                    });
                    if (preset.requireProps && this.store && willRequestActions.length > 0) {
                        // 对props做处理
                        willRequestActions.forEach(function (actionName) {
                            var params = _this.handleParams(_this.oldRequestParams[actionName][0], props);
                            _this.oldRequestParams[actionName] = [_this.oldRequestParams[actionName][0], params];
                            _this.store.dispatch(actionName, params);
                        });
                    }
                };
                ConnectComponent.prototype.setStore = function (store) {
                    this.store = store;
                };
                ConnectComponent.prototype.fillProps = function (props) {
                    var newProps = {};
                    if (this.props.location) {
                        var search = this.props.location.search;
                        if (search.trim() !== '') {
                            var searchObj = search.substring('1').split('&');
                            searchObj.forEach(function (value) {
                                var temp = value.split('=');
                                newProps[temp[0]] = temp[1];
                            });
                        }
                    }
                    if (this.props.match) {
                        newProps = __assign({}, newProps, this.props.match.params);
                    }
                    return __assign({}, newProps, props);
                };
                ConnectComponent.prototype.render = function () {
                    var _this = this;
                    return React.createElement(Consumer, null, function (store) {
                        _this.setStore(store);
                        if (!_this.requested) {
                            preset.autoActions.forEach(function (action) {
                                var params = _this.handleParams(action.params, _this.props);
                                _this.oldRequestParams[action.name] = [action.params, params];
                                store.dispatch(action.name, params);
                                _this.willRequestAction.add(action.name);
                            });
                            _this.requested = true;
                            return _this.oldLoadingComponent = preset.startRequest();
                        }
                        else if (_this.willRequestAction.size > 0) {
                            if (!store.isLoading) {
                                _this.willRequestAction["delete"](store.reason);
                                if (_this.willRequestAction.size !== 0) {
                                    return _this.oldLoadingComponent = preset.waitRequest(Array.from(_this.willRequestAction));
                                }
                            }
                            else {
                                return _this.oldLoadingComponent;
                            }
                        }
                        var newProps = mapStateToProps(store.store, store.loading);
                        var result = __assign({}, _this.fillProps(_this.props), newProps, { dispatch: store.dispatch, commit: store.commit });
                        if (preset.requireProps) {
                            var checkResults = PropChecks.checkPropTypes(preset.requireProps, result, 'prop', App.name);
                            if (checkResults.length > 0) {
                                var messages_1 = [];
                                checkResults.forEach(function (type) {
                                    messages_1.push(type.name);
                                });
                                return preset.typeError(messages_1);
                            }
                        }
                        return React.createElement(App, __assign({}, result));
                    });
                };
                return ConnectComponent;
            }(React.Component));
        };
    };
}

/* tslint:disable */
var co = require('co');
var Store = /** @class */ (function () {
    function Store(modelMaps) {
        var _this = this;
        this.state = {};
        this.loading = {};
        this.modelMaps = {};
        this.subscribes = [];
        Object.keys(modelMaps).forEach(function (namespace) {
            _this.state[namespace] = modelMaps[namespace].state;
        });
        this.modelMaps = modelMaps;
    }
    Store.prototype.getState = function () {
        return this.state;
    };
    Store.prototype.dispatch = function (dispatchAction, params) {
        var _this = this;
        var action = dispatchAction.split('/');
        return co(function () { return __awaiter(_this, void 0, void 0, function () {
            var result;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.loading[dispatchAction] = true;
                        this.subscribes.forEach(function (fn) {
                            fn(_this.state, dispatchAction, _this.loading, true);
                        });
                        return [4 /*yield*/, this.modelMaps[action[0]].actions[action[1]]({
                                commit: this.commit.bind(this, dispatchAction),
                                dispatch: this.dispatch.bind(this),
                                store: __assign({}, this.state[action[0]]),
                                state: __assign({}, this.state[action[0]])
                            }, params)];
                    case 1:
                        result = _a.sent();
                        this.loading[dispatchAction] = false;
                        this.subscribes.forEach(function (fn) {
                            console.log(_this.loading);
                            fn(_this.state, dispatchAction, _this.loading, false);
                        });
                        return [2 /*return*/, result];
                }
            });
        }); });
    };
    Store.prototype.commit = function (dispatchAction, commonAction, params) {
        var action = dispatchAction.split('/');
        console.log(action, this.modelMaps, commonAction);
        if (!this.modelMaps[action[0]].mutations[commonAction]) {
            throw (new Error('不存在此action'));
            return;
        }
        this.modelMaps[action[0]].mutations[commonAction](this.state[action[0]], params);
    };
    Store.prototype.subscribe = function (fn) {
        this.subscribes.push(fn);
    };
    return Store;
}());
function createStore (modelMaps) {
    return new Store(modelMaps);
}

/* tslint:disable */
function createProviderAndConnect(store) {
    var newContent = React.createContext({});
    var Provider = innerCreateProvider(newContent.Provider, store);
    var connect = innerCreateConnect(newContent.Consumer);
    return {
        Provider: Provider,
        connect: connect
    };
}

exports.createStore = createStore;
exports.createProviderAndConnect = createProviderAndConnect;
