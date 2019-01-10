/* tslint:disable */
import * as React from 'react';
export default function (Provider: any, store: any) {
    return class WrapProvider extends React.Component {
        state: any = null
        constructor(props: any) {
            super(props);
            this.state = {
                store: store.getState(),
                reason: 'init',
            }
            store.subscribe((store: any, reason: any, loading: object, isLoading: Boolean) => {
                this.setState({
                    store,
                    reason,
                    loading,
                    isLoading
                });
            });
        }
        render() {
            const props = {
                commit: store.commit.bind(store),
                dispatch: store.dispatch.bind(store),
                store: this.state.store,
                state: this.state.store,
                reason: this.state.reason,
                loading: this.state.loading,
                isLoading: this.state.isLoading
            }
            return <Provider value={props}>
                {
                    this.props.children
                }
            </Provider>
        }
    }
}