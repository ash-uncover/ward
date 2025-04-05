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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _MessageDispatcher_instances, _MessageDispatcher_id, _MessageDispatcher_services, _MessageDispatcher_dispatchers, _MessageDispatcher_logger, _MessageDispatcher_listeners, _MessageDispatcher_handler, _MessageDispatcher_handleMessage, _MessageDispatcher_handleConnectionRequest, _MessageDispatcher_handleConnectionAcknowledge, _MessageDispatcher_handleConnectionClosing;
Object.defineProperty(exports, "__esModule", { value: true });
exports.CONNECTION_CLOSING = exports.CONNECTION_ACKNOWLEDGE = exports.CONNECTION_REQUEST = void 0;
const js_utils_1 = require("@uncover/js-utils");
const js_utils_logger_1 = require("@uncover/js-utils-logger");
const FrameService_1 = __importDefault(require("./services/FrameService"));
exports.CONNECTION_REQUEST = '__CONNNECTION_REQUEST__';
exports.CONNECTION_ACKNOWLEDGE = '__CONNECTION_ACKNOWLEDGE__';
exports.CONNECTION_CLOSING = '__CONNNECTION_CLOSING__';
class MessageDispatcher {
    constructor(id, logConfig) {
        _MessageDispatcher_instances.add(this);
        _MessageDispatcher_id.set(this, void 0);
        _MessageDispatcher_services.set(this, []);
        _MessageDispatcher_dispatchers.set(this, []);
        _MessageDispatcher_logger.set(this, void 0);
        _MessageDispatcher_listeners.set(this, []);
        _MessageDispatcher_handler.set(this, void 0);
        __classPrivateFieldSet(this, _MessageDispatcher_logger, new js_utils_logger_1.Logger('MessageDispatcher', logConfig), "f");
        __classPrivateFieldSet(this, _MessageDispatcher_id, id || js_utils_1.UUID.next(), "f");
        this.logger.info(`[DISP-${this.id}] created`);
        __classPrivateFieldSet(this, _MessageDispatcher_handler, __classPrivateFieldGet(this, _MessageDispatcher_instances, "m", _MessageDispatcher_handleMessage).bind(this, window), "f");
        window.addEventListener('message', __classPrivateFieldGet(this, _MessageDispatcher_handler, "f"));
        if (window !== window.parent) {
            this.logger.info(`[DISP-${this.id}] contact parent`);
            window.parent.postMessage({
                _dispatcherId: __classPrivateFieldGet(this, _MessageDispatcher_id, "f"),
                type: exports.CONNECTION_REQUEST
            }, '*');
        }
        else if (window.documentPictureInPicture) {
            window.documentPictureInPicture.addEventListener("enter", (event) => {
                const pipWindow = event.window;
                pipWindow.addEventListener('message', __classPrivateFieldGet(this, _MessageDispatcher_instances, "m", _MessageDispatcher_handleMessage).bind(this, pipWindow));
            });
        }
    }
    get data() {
        return {
            services: this.services,
            dispatchers: this.dispatchers
        };
    }
    get id() {
        return __classPrivateFieldGet(this, _MessageDispatcher_id, "f");
    }
    get services() {
        return __classPrivateFieldGet(this, _MessageDispatcher_services, "f").reduce((acc, service) => {
            acc[service.id] = service;
            return acc;
        }, {});
    }
    get dispatchers() {
        return __classPrivateFieldGet(this, _MessageDispatcher_dispatchers, "f").slice();
    }
    get logger() {
        return __classPrivateFieldGet(this, _MessageDispatcher_logger, "f");
    }
    register(listener) {
        __classPrivateFieldGet(this, _MessageDispatcher_listeners, "f").push(listener);
        return () => this.unregister(listener);
    }
    unregister(listener) {
        __classPrivateFieldSet(this, _MessageDispatcher_listeners, js_utils_1.ArrayUtils.removeElement(__classPrivateFieldGet(this, _MessageDispatcher_listeners, "f"), listener), "f");
    }
    notify() {
        __classPrivateFieldGet(this, _MessageDispatcher_listeners, "f").forEach(listener => {
            try {
                listener(this.data);
            }
            catch (error) {
                this.logger.error(`[DISP-${this.id}] listener failed with error`);
                this.logger.error(`${error}`);
            }
        });
    }
    terminate() {
        this.logger.info(`[DISP-${this.id}] stopping`);
        window.removeEventListener('message', __classPrivateFieldGet(this, _MessageDispatcher_handler, "f"));
        if (window !== window.parent) {
            this.logger.info(`[DISP-${this.id}] notifying parent`);
            window.parent.postMessage({
                _dispatcherId: __classPrivateFieldGet(this, _MessageDispatcher_id, "f"),
                type: exports.CONNECTION_CLOSING
            }, '*');
        }
    }
    reset() {
        __classPrivateFieldSet(this, _MessageDispatcher_services, [], "f");
        __classPrivateFieldSet(this, _MessageDispatcher_dispatchers, [], "f");
        this.notify();
    }
    getService(serviceId) {
        return __classPrivateFieldGet(this, _MessageDispatcher_services, "f").find(service => service.id === serviceId);
    }
    addService(service) {
        this.logger.info(`[DISP-${this.id}] add service [${service.id}]`);
        if (!__classPrivateFieldGet(this, _MessageDispatcher_services, "f").includes(service)) {
            __classPrivateFieldGet(this, _MessageDispatcher_services, "f").push(service);
        }
        this.notify();
        return () => this.removeService(service);
    }
    removeService(service) {
        this.logger.info(`[DISP-${this.id}] remove service [${service.id}]`);
        __classPrivateFieldSet(this, _MessageDispatcher_services, __classPrivateFieldGet(this, _MessageDispatcher_services, "f").filter(serv => serv !== service), "f");
        if (service instanceof FrameService_1.default) {
            __classPrivateFieldSet(this, _MessageDispatcher_dispatchers, __classPrivateFieldGet(this, _MessageDispatcher_dispatchers, "f").filter(dispatcherId => dispatcherId !== service.remoteDispatcherId), "f");
        }
        this.notify();
    }
    sendMessage(message) {
        this.logger.info(`[DISP-${this.id}] send message to ${__classPrivateFieldGet(this, _MessageDispatcher_services, "f").length - 1} services from [${__classPrivateFieldGet(this, _MessageDispatcher_id, "f")}-${message._serviceId}]`);
        __classPrivateFieldGet(this, _MessageDispatcher_services, "f").forEach((service) => {
            if (service.id !== message._serviceId) {
                this.logger.info(`[DISP-${this.id}] send message on service [${service.id}]`);
                service.onMessage(Object.assign({ _dispatcherId: __classPrivateFieldGet(this, _MessageDispatcher_id, "f") }, message));
            }
        });
    }
}
_MessageDispatcher_id = new WeakMap(), _MessageDispatcher_services = new WeakMap(), _MessageDispatcher_dispatchers = new WeakMap(), _MessageDispatcher_logger = new WeakMap(), _MessageDispatcher_listeners = new WeakMap(), _MessageDispatcher_handler = new WeakMap(), _MessageDispatcher_instances = new WeakSet(), _MessageDispatcher_handleMessage = function _MessageDispatcher_handleMessage(window, event) {
    var _a;
    if ((_a = event.data) === null || _a === void 0 ? void 0 : _a._dispatcherId) {
        switch (event.data.type) {
            case exports.CONNECTION_REQUEST: {
                __classPrivateFieldGet(this, _MessageDispatcher_instances, "m", _MessageDispatcher_handleConnectionRequest).call(this, event, window);
                break;
            }
            case exports.CONNECTION_ACKNOWLEDGE: {
                __classPrivateFieldGet(this, _MessageDispatcher_instances, "m", _MessageDispatcher_handleConnectionAcknowledge).call(this, event, window);
                break;
            }
            case exports.CONNECTION_CLOSING: {
                __classPrivateFieldGet(this, _MessageDispatcher_instances, "m", _MessageDispatcher_handleConnectionClosing).call(this, event);
                break;
            }
        }
    }
}, _MessageDispatcher_handleConnectionRequest = function _MessageDispatcher_handleConnectionRequest(event, wdow = window) {
    const dispatcherId = event.data._dispatcherId;
    this.logger.info(`[DISP-${this.id}] child trying to connect [${dispatcherId}]`);
    this.logger.info(`[DISP-${this.id}] current childs: ${this.dispatchers.join(', ')}`);
    const wdowRemote = event.source;
    const origin = event.origin;
    if (!__classPrivateFieldGet(this, _MessageDispatcher_dispatchers, "f").includes(dispatcherId)) {
        const service = new FrameService_1.default(this, wdow, wdowRemote, origin, dispatcherId, undefined, this.logger.config);
        __classPrivateFieldGet(this, _MessageDispatcher_dispatchers, "f").push(dispatcherId);
        this.addService(service);
        service.onMessage({
            _dispatcherId: __classPrivateFieldGet(this, _MessageDispatcher_id, "f"),
            _serviceId: service.id,
            type: exports.CONNECTION_ACKNOWLEDGE,
            payload: null
        });
    }
}, _MessageDispatcher_handleConnectionAcknowledge = function _MessageDispatcher_handleConnectionAcknowledge(event, wdow = window) {
    this.logger.info(`[DISP-${this.id}] parent acknowledge connection`);
    const service = new FrameService_1.default(this, wdow, window.parent, event.origin, event.data._dispatcherId, event.data._serviceId, this.logger.config);
    this.addService(service);
}, _MessageDispatcher_handleConnectionClosing = function _MessageDispatcher_handleConnectionClosing(event) {
    this.logger.info(`[DISP-${this.id}] child notify closing`);
};
exports.default = MessageDispatcher;
//# sourceMappingURL=MessageDispatcher.js.map