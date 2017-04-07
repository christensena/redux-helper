import * as Redux from 'redux';
/**
 * Action Interface
 */
export interface Action<TPayload> extends Redux.Action {
    payload: TPayload;
}
/**
 * Plain Action creator
 */
export interface CreateAction<TPayload> {
    (payload?: TPayload): Action<TPayload>;
    matchAction(action: Redux.Action): action is Action<TPayload>;
    typeCreated: string;
}
export declare const createAction: <TPayload>(actionName: string) => CreateAction<TPayload>;
/**
 * Promise Action Interface and Creator
 */
export interface CreatePromiseAction<TParms> {
    (parms?: TParms): Redux.Action;
    matchAction(action: Redux.Action): action is PromiseAction;
    matchOnStart(action: Redux.Action): action is PromiseAction;
    matchOnEnd(action: Redux.Action): action is PromiseAction;
    matchOnError(action: Redux.Action): action is PromiseAction;
    typeCreated: string;
}
/**
 * Promise Action Options
 */
export interface CreatePromiseActionOptions {
    checkExecution?: boolean;
    enableProgress?: boolean;
    message?: string;
}
export interface IPromiseAction {
    promiseActionType: string;
    promiseActionEvent: 'OnStart' | 'OnEnd' | 'OnError';
    promiseActionMessage?: string;
    promiseActionError?: any;
}
export interface PromiseAction extends IPromiseAction, Redux.Action {
}
export declare const createPromiseAction: <TParms, TResult>(actionName: string, promise: (parms: TParms | undefined) => Promise<TResult>, resultAction: (res: TResult, parms?: TParms | undefined) => any, options?: CreatePromiseActionOptions | undefined) => CreatePromiseAction<TParms>;
export declare function createPromiseThunkAction<TParms, TResult>(type: string, promise: (arg: TParms) => Promise<TResult>, afterResultThunk: (dispatch: Redux.Dispatch<any>, getState: () => any, res: TResult, parms?: TParms) => void): CreatePromiseAction<TParms>;
export declare function createPromiseWithThunkAction<TParms, TResult>(type: string, promise: (arg: TParms) => Promise<TResult>, resultAction: ((res: TResult, parms?: TParms | undefined) => any) | undefined, afterResultThunk: (dispatch: Redux.Dispatch<any>, getState: () => any, res: TResult, parms?: TParms) => void): CreatePromiseAction<TParms>;
