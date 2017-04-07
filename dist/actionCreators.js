"use strict";

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

Object.defineProperty(exports, "__esModule", { value: true });
exports.createAction = function (actionName) {
    var create = function create(payload) {
        return { type: actionName, payload: payload };
    };
    create.matchAction = function (action) {
        return action.type === actionName;
    };
    create.typeCreated = actionName;
    return create;
};
exports.createPromiseAction = function (actionName, promise, resultAction, options) {
    var create = function create(parms) {
        return {
            type: actionName,
            isPromiseAction: true,
            payload: _extends({}, options, {
                promiseParms: parms,
                promise: promise(parms),
                resultAction: resultAction
            })
        };
    };
    create.matchAction = function (action) {
        return action.promiseActionType === actionName;
    };
    create.matchOnStart = function (action) {
        return action.promiseActionType === actionName && action.promiseActionEvent === 'OnStart';
    };
    create.matchOnEnd = function (action) {
        return action.promiseActionType === actionName && action.promiseActionEvent === 'OnEnd';
    };
    create.matchOnError = function (action) {
        return action.promiseActionType === actionName && action.promiseActionEvent === 'OnError';
    };
    create.typeCreated = actionName;
    return create;
};
function createPromiseThunkAction(type, promise, afterResultThunk) {
    return createPromiseWithThunkAction(type, promise, undefined, afterResultThunk);
}
exports.createPromiseThunkAction = createPromiseThunkAction;
function createPromiseWithThunkAction(type, promise, resultAction, afterResultThunk) {
    var thunkAction = function thunkAction(res, parms) {
        return function (dispatch, getState) {
            if (resultAction) dispatch(resultAction(res));
            if (afterResultThunk) afterResultThunk(dispatch, getState, res, parms);
        };
    };
    return exports.createPromiseAction(type, promise, thunkAction);
}
exports.createPromiseWithThunkAction = createPromiseWithThunkAction;
//# sourceMappingURL=actionCreators.js.map