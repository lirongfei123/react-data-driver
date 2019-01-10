// 声明文件主要生命了, 向外提供的各个接口, 和变量, 以及 各个接口应该传入的参数类型, 以及返回值类型
interface CommitFunc {
    (actionName: string, params: Object): void
}
interface DispatchFunc {
    (actionName: string, params: Object): Promise<any>
}
interface SubscribeFunc {
    (fn: Function): any
}
interface StateFunc {
    (): Object
}
export interface DispatchParams {
    commit(actionName: string, params: Object): void,
    dispatch(actionName: string, params: Object): Promise<any>,
    store: Object,
    subscribe: SubscribeFunc
    getState: StateFunc
}
export interface State {
    dispatch: DispatchFunc,
    commit: CommitFunc,
    (propName: string): Object
}
export interface CommitParams {
    state: any,
    store: any
}
export interface Mutation {
    (params: CommitParams, data: any): any
}
export interface Mutations {
    [propName: string]: Mutation
}
export interface Action {
    (params: DispatchParams, data: any): Promise<any>
}
export interface Actions {
    [propName: string]: Action
}
export interface Module {
    state: Object,
    mutations: Mutations,
    actions: Actions
}
export interface Modules {
    [propName: string]: Module
}
export interface mapStateToProps {
    (state: State): Object
}
export interface PCResult {
    Provider: any,
    connect(mapStateToProps, params?: any): void
}
export function createStore (modules: Modules): State;
export function createProviderAndConnect (state: State): DispatchParams;
