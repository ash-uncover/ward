"use strict";
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _FrameService_instances, _FrameService_id, _FrameService_dispatcher, _FrameService_remoteDispatcherId, _FrameService_window, _FrameService_windowRemote, _FrameService_origin, _FrameService_logger, _FrameService_handleBeforeUnload, _FrameService_handleMessage;
Object.defineProperty(exports, "__esModule", { value: true });
const js_utils_1 = require("@uncover/js-utils");
const js_utils_logger_1 = require("@uncover/js-utils-logger");
const model_1 = require("../model/model");
const MessageDispatcher_1 = require("../MessageDispatcher");
class FrameService {
    constructor(dispatcher, wdow, wdowRemote, origin, remoteDispatcherId, id, logConfig) {
        _FrameService_instances.add(this);
        _FrameService_id.set(this, void 0);
        _FrameService_dispatcher.set(this, void 0);
        _FrameService_remoteDispatcherId.set(this, void 0);
        _FrameService_window.set(this, void 0);
        _FrameService_windowRemote.set(this, void 0);
        _FrameService_origin.set(this, void 0);
        _FrameService_logger.set(this, void 0);
        __classPrivateFieldSet(this, _FrameService_logger, new js_utils_logger_1.Logger("FrameService", logConfig), "f");
        __classPrivateFieldSet(this, _FrameService_dispatcher, dispatcher, "f");
        __classPrivateFieldSet(this, _FrameService_id, id || js_utils_1.UUID.next(), "f");
        __classPrivateFieldSet(this, _FrameService_window, wdow, "f");
        __classPrivateFieldSet(this, _FrameService_windowRemote, wdowRemote, "f");
        __classPrivateFieldSet(this, _FrameService_origin, origin, "f");
        __classPrivateFieldSet(this, _FrameService_remoteDispatcherId, remoteDispatcherId, "f");
        this.logger.info(`[DISP-${this.dispatcherId}/FRAME-${this.id}] created`);
        window.addEventListener("message", __classPrivateFieldGet(this, _FrameService_instances, "m", _FrameService_handleMessage).bind(this));
        window.addEventListener("beforeUnload", __classPrivateFieldGet(this, _FrameService_instances, "m", _FrameService_handleBeforeUnload).bind(this));
    }
    get id() {
        return __classPrivateFieldGet(this, _FrameService_id, "f");
    }
    get dispatcherId() {
        return __classPrivateFieldGet(this, _FrameService_dispatcher, "f").id;
    }
    get remoteDispatcherId() {
        return __classPrivateFieldGet(this, _FrameService_remoteDispatcherId, "f");
    }
    get window() {
        return __classPrivateFieldGet(this, _FrameService_windowRemote, "f");
    }
    get type() {
        return model_1.MessageServiceTypes.FRAME;
    }
    get logger() {
        return __classPrivateFieldGet(this, _FrameService_logger, "f");
    }
    onMessage(message) {
        this.logger.info(`[DISP-${this.dispatcherId}/FRAME-${this.id}] onMessage ${message.type}`);
        if (__classPrivateFieldGet(this, _FrameService_windowRemote, "f").closed) {
            this.logger.info(`[DISP-${this.dispatcherId}/FRAME-${this.id}] onMessage /!\\ window closed /!\\`);
            this.terminate();
        }
        else {
            this.logger.debug(`[DISP-${this.dispatcherId}/FRAME-${this.id}] onMessage posting message to ${__classPrivateFieldGet(this, _FrameService_origin, "f")}`);
            __classPrivateFieldGet(this, _FrameService_windowRemote, "f").postMessage(Object.assign(Object.assign({}, message), { _serviceId: __classPrivateFieldGet(this, _FrameService_id, "f") }), __classPrivateFieldGet(this, _FrameService_origin, "f"));
        }
    }
    sendMessage(message) {
        this.logger.debug(`[DISP-${this.dispatcherId}/FRAME-${this.id}] sendMessage ${message.type}`);
        __classPrivateFieldGet(this, _FrameService_dispatcher, "f").sendMessage(Object.assign(Object.assign({}, message), { _serviceId: this.id }));
    }
    terminate() {
        this.logger.info(`[DISP-${this.dispatcherId}/FRAME-${this.id}] terminate`);
        __classPrivateFieldGet(this, _FrameService_dispatcher, "f").removeService(this);
    }
}
_FrameService_id = new WeakMap(), _FrameService_dispatcher = new WeakMap(), _FrameService_remoteDispatcherId = new WeakMap(), _FrameService_window = new WeakMap(), _FrameService_windowRemote = new WeakMap(), _FrameService_origin = new WeakMap(), _FrameService_logger = new WeakMap(), _FrameService_instances = new WeakSet(), _FrameService_handleBeforeUnload = function _FrameService_handleBeforeUnload() {
    this.onMessage({
        type: MessageDispatcher_1.CONNECTION_CLOSING,
        _dispatcherId: this.dispatcherId,
        payload: {},
    });
    this.terminate();
}, _FrameService_handleMessage = function _FrameService_handleMessage(event) {
    const data = event.data || {};
    if (data._serviceId &&
        data._dispatcherId &&
        data._dispatcherId === __classPrivateFieldGet(this, _FrameService_remoteDispatcherId, "f")) {
        this.logger.debug(`[DISP-${this.dispatcherId}/FRAME-${this.id}] handleMessage ${event.data.type}`);
        if (data.type === MessageDispatcher_1.CONNECTION_CLOSING) {
            this.terminate();
        }
        else {
            this.sendMessage({
                _serviceId: __classPrivateFieldGet(this, _FrameService_id, "f"),
                type: data.type,
                payload: data.payload,
            });
        }
    }
};
exports.default = FrameService;
//# sourceMappingURL=PipService.js.map