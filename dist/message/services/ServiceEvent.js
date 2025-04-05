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
var _ServiceEvent_id, _ServiceEvent_dispatcher, _ServiceEvent_handlers, _ServiceEvent_logger;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServiceEvent = void 0;
const js_utils_1 = require("@uncover/js-utils");
const js_utils_logger_1 = require("@uncover/js-utils-logger");
const model_1 = require("../model/model");
class ServiceEvent {
    constructor(dispatcher, id, logConfig) {
        _ServiceEvent_id.set(this, void 0);
        _ServiceEvent_dispatcher.set(this, void 0);
        _ServiceEvent_handlers.set(this, []);
        _ServiceEvent_logger.set(this, void 0);
        __classPrivateFieldSet(this, _ServiceEvent_logger, new js_utils_logger_1.Logger("EventService", logConfig), "f");
        __classPrivateFieldSet(this, _ServiceEvent_id, id || js_utils_1.UUID.next(), "f");
        __classPrivateFieldSet(this, _ServiceEvent_dispatcher, dispatcher, "f");
        __classPrivateFieldGet(this, _ServiceEvent_dispatcher, "f").addService(this);
        this.logger.info(`[DISP-${this.dispatcherId}/EVENT-${this.id}] created`);
    }
    get id() {
        return __classPrivateFieldGet(this, _ServiceEvent_id, "f");
    }
    get dispatcherId() {
        return __classPrivateFieldGet(this, _ServiceEvent_dispatcher, "f").id;
    }
    get type() {
        return model_1.MessageServiceTypes.EVENT;
    }
    get logger() {
        return __classPrivateFieldGet(this, _ServiceEvent_logger, "f");
    }
    terminate() {
        this.logger.info(`[DISP-${this.dispatcherId}/EVENT-${this.id}] terminate`);
        __classPrivateFieldSet(this, _ServiceEvent_handlers, [], "f");
        __classPrivateFieldGet(this, _ServiceEvent_dispatcher, "f").removeService(this);
    }
    addHandler(handler) {
        this.logger.debug(`[DISP-${this.dispatcherId}/EVENT-${this.id}] add handler`);
        __classPrivateFieldGet(this, _ServiceEvent_handlers, "f").push(handler);
        return this.removeHandler.bind(this, handler);
    }
    removeHandler(handler) {
        this.logger.debug(`[DISP-${this.dispatcherId}/EVENT-${this.id}] add handler`);
        __classPrivateFieldSet(this, _ServiceEvent_handlers, js_utils_1.ArrayUtils.removeElement(__classPrivateFieldGet(this, _ServiceEvent_handlers, "f"), handler), "f");
    }
    onMessage(message) {
        this.logger.debug(`[DISP-${this.dispatcherId}/EVENT-${this.id}] onMessage`);
        __classPrivateFieldGet(this, _ServiceEvent_handlers, "f").forEach((handler) => {
            try {
                handler(message);
            }
            catch (error) {
                this.logger.error(`[DISP-${this.dispatcherId}/EVENT-${this.id}] handler failed with error`);
                this.logger.error(`${error}`);
            }
        });
    }
    sendMessage(message) {
        this.logger.info(`[DISP-${this.dispatcherId}/EVENT-${this.id}] sendMessage`);
        __classPrivateFieldGet(this, _ServiceEvent_dispatcher, "f").sendMessage(Object.assign(Object.assign({}, message), { _serviceId: this.id }));
    }
}
exports.ServiceEvent = ServiceEvent;
_ServiceEvent_id = new WeakMap(), _ServiceEvent_dispatcher = new WeakMap(), _ServiceEvent_handlers = new WeakMap(), _ServiceEvent_logger = new WeakMap();
//# sourceMappingURL=ServiceEvent.js.map