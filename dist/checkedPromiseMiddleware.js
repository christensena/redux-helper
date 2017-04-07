"use strict";

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

Object.defineProperty(exports, "__esModule", { value: true });
var _validFunction = function _validFunction(obj) {
    return obj && typeof obj === 'function';
};
var _validAction = function _validAction(object) {
    return object && object instanceof Object && !(object instanceof Array) && typeof object !== "function" && typeof object.type === "string";
};
var checkedPromiseMiddleware = function checkedPromiseMiddleware(options) {
    return function (midlapi) {
        return function (next) {
            return function (action) {
                if (!action || !action.isPromiseAction || !action.payload) return next(action);
                var opts = options || {};
                var _action$payload = action.payload,
                    _action$payload$check = _action$payload.checkExecution,
                    checkExecution = _action$payload$check === undefined ? false : _action$payload$check,
                    _action$payload$enabl = _action$payload.enableProgress,
                    enableProgress = _action$payload$enabl === undefined ? true : _action$payload$enabl,
                    _action$payload$messa = _action$payload.message,
                    message = _action$payload$messa === undefined ? 'loading' : _action$payload$messa,
                    promiseParms = _action$payload.promiseParms,
                    _action$payload$promi = _action$payload.promise,
                    promise = _action$payload$promi === undefined ? undefined : _action$payload$promi,
                    resultAction = _action$payload.resultAction;

                if (!promise || typeof promise.then !== 'function' || !_validFunction(resultAction)) {
                    return next(action);
                }
                var dispatch = midlapi.dispatch,
                    getState = midlapi.getState;

                if (checkExecution && _validFunction(opts.shouldExecute) && !opts.shouldExecute(getState())) {
                    console.log('discarding action ' + action.type);
                    return;
                }
                if (enableProgress && _validFunction(opts.onStart)) {
                    var actStart = opts.onStart(message);
                    if (_validAction(actStart)) {
                        _extends(actStart, {
                            promiseActionType: action.type,
                            promiseActionEvent: 'OnStart',
                            promiseActionMessage: message
                        });
                        dispatch(actStart);
                    }
                }
                return promise.then(function (response) {
                    if (enableProgress && _validFunction(opts.onEnd)) {
                        var actEnd = opts.onEnd();
                        if (_validAction(actEnd)) {
                            _extends(actEnd, {
                                promiseActionType: action.type,
                                promiseActionEvent: 'OnEnd'
                            });
                            dispatch(actEnd);
                        }
                    }
                    var actResult = resultAction(response, promiseParms);
                    dispatch(actResult);
                }, function (error) {
                    if (_validFunction(opts.onError)) {
                        var actError = opts.onError(error);
                        if (_validAction(actError)) {
                            _extends(actError, {
                                promiseActionType: action.type,
                                promiseActionEvent: 'OnError',
                                promiseActionError: error
                            });
                            dispatch(actError);
                        }
                    }
                });
            };
        };
    };
};
exports.default = checkedPromiseMiddleware;
//# sourceMappingURL=checkedPromiseMiddleware.js.map