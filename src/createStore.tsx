/* tslint:disable */
const co = require('co');
class Store {
    state: any = {}
    loading: object = {}
    modelMaps: any = {}
    constructor(modelMaps: any) {
        Object.keys(modelMaps).forEach((namespace) => {
            this.state[namespace] = modelMaps[namespace].state;
        });
        this.modelMaps = modelMaps;
    }
    subscribes = [];
    getState() {
        return this.state;
    }
    dispatch(dispatchAction: any, params: any) {
        const action = dispatchAction.split('/');
        return co(async () => {
            this.loading[dispatchAction] = true;
            this.subscribes.forEach((fn: any) => {
                fn(this.state, dispatchAction, this.loading, true);
            });
            const result = await this.modelMaps[action[0]].actions[action[1]]({
                commit: this.commit.bind(this, dispatchAction),
                dispatch: this.dispatch.bind(this),
                store: {
                    ...this.state[action[0]]
                },
                state: {
                    ...this.state[action[0]]
                }
            }, params);
            this.loading[dispatchAction] = false;
            this.subscribes.forEach((fn: any) => {
                fn(this.state, dispatchAction, this.loading, false);
            });
            return result;
        });
    }
    commit (dispatchAction: any, commonAction: any, params: any) {
        const action = dispatchAction.split('/');
        if (!this.modelMaps[action[0]].mutations[commonAction]) {
            throw(new Error('不存在此action'));
            return;
        }
        this.modelMaps[action[0]].mutations[commonAction](this.state[action[0]], params);
    }
    subscribe (fn: any) {
        this.subscribes.push(fn);
    }
}

export default function (modelMaps: any) {
    return new Store(modelMaps);
}