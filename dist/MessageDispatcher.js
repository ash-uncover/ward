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
var _MessageDispatcherClass_instances, _MessageDispatcherClass_id, _MessageDispatcherClass_services, _MessageDispatcherClass_dispatchers, _MessageDispatcherClass_handleMessage, _MessageDispatcherClass_handleConnectionRequest, _MessageDispatcherClass_handleConnectionAcknowledge;
Object.defineProperty(exports, "__esModule", { value: true });
const js_utils_1 = require("@uncover/js-utils");
const js_utils_logger_1 = __importDefault(require("@uncover/js-utils-logger"));
const MessageServiceFrame_1 = __importDefault(require("./MessageServiceFrame"));
const CONNECTION_REQUEST = '__CONNNECTION_REQUEST__';
const CONNECTION_ACKNOWLEDGE = '__CONNECTION_ACKNOWLEDGE__';
const LOGGER = new js_utils_logger_1.default('MessageDispatcher', 0);
class MessageDispatcherClass {
    // Constructor //
    constructor(id) {
        _MessageDispatcherClass_instances.add(this);
        // Attributes //
        _MessageDispatcherClass_id.set(this, void 0);
        _MessageDispatcherClass_services.set(this, []);
        _MessageDispatcherClass_dispatchers.set(this, []
        // Constructor //
        );
        __classPrivateFieldSet(this, _MessageDispatcherClass_id, id || `message-dispatcher-${js_utils_1.UUID.next()}`, "f");
        // Wait for registration of other services
        window.addEventListener('message', __classPrivateFieldGet(this, _MessageDispatcherClass_instances, "m", _MessageDispatcherClass_handleMessage).bind(this));
        if (window !== window.parent) {
            // Try to connect to a parent service
            LOGGER.info(`[${this.idShort}] contact parent`);
            window.parent.postMessage({
                _dispatcherId: this.id,
                type: CONNECTION_REQUEST
            }, '*');
        }
    }
    // Getters & Setters //
    get id() {
        return __classPrivateFieldGet(this, _MessageDispatcherClass_id, "f");
    }
    get idShort() {
        return __classPrivateFieldGet(this, _MessageDispatcherClass_id, "f").substring(__classPrivateFieldGet(this, _MessageDispatcherClass_id, "f").length - 3);
    }
    // Public Methods //
    addService(service) {
        LOGGER.info(`[${this.idShort}] add service ${service.idShort}`);
        if (!__classPrivateFieldGet(this, _MessageDispatcherClass_services, "f").includes(service)) {
            __classPrivateFieldGet(this, _MessageDispatcherClass_services, "f").push(service);
        }
        return () => this.removeService(service);
    }
    removeService(service) {
        LOGGER.info(`[${this.idShort}] remove service ${service.idShort}`);
        __classPrivateFieldSet(this, _MessageDispatcherClass_services, __classPrivateFieldGet(this, _MessageDispatcherClass_services, "f").filter(serv => serv !== service), "f");
    }
    sendMessage(message) {
        var _a;
        LOGGER.info(`[${this.idShort}] send message to ${__classPrivateFieldGet(this, _MessageDispatcherClass_services, "f").length - 1} services from [${this.idShort}-${(_a = message._serviceId) === null || _a === void 0 ? void 0 : _a.substring(message._serviceId.length - 3)}]`);
        __classPrivateFieldGet(this, _MessageDispatcherClass_services, "f").forEach((service) => {
            if (service.id !== message._serviceId) {
                LOGGER.info(`[${this.idShort}] send message on service ${service.idShort}`);
                service.onMessage(Object.assign({ _dispatcherId: __classPrivateFieldGet(this, _MessageDispatcherClass_id, "f") }, message));
            }
        });
    }
}
_MessageDispatcherClass_id = new WeakMap(), _MessageDispatcherClass_services = new WeakMap(), _MessageDispatcherClass_dispatchers = new WeakMap(), _MessageDispatcherClass_instances = new WeakSet(), _MessageDispatcherClass_handleMessage = function _MessageDispatcherClass_handleMessage(event) {
    const data = event.data || {};
    if (data._dispatcherId) {
        switch (data.type) {
            case CONNECTION_REQUEST: {
                __classPrivateFieldGet(this, _MessageDispatcherClass_instances, "m", _MessageDispatcherClass_handleConnectionRequest).call(this, event);
                break;
            }
            case CONNECTION_ACKNOWLEDGE: {
                __classPrivateFieldGet(this, _MessageDispatcherClass_instances, "m", _MessageDispatcherClass_handleConnectionAcknowledge).call(this, event);
                break;
            }
        }
    }
}, _MessageDispatcherClass_handleConnectionRequest = function _MessageDispatcherClass_handleConnectionRequest(event) {
    var _a;
    const dispatcherId = (_a = event.data) === null || _a === void 0 ? void 0 : _a._dispatcherId;
    LOGGER.info(`[${this.idShort}] child trying to connect [${dispatcherId.substring(dispatcherId.length - 3)}]`);
    LOGGER.info(`[${this.idShort}] current childs: ${__classPrivateFieldGet(this, _MessageDispatcherClass_dispatchers, "f").join(', ')}`);
    const wdow = event.source;
    if (!__classPrivateFieldGet(this, _MessageDispatcherClass_dispatchers, "f").includes(dispatcherId)) {
        const service = new MessageServiceFrame_1.default(dispatcherId, wdow);
        this.addService(service);
        __classPrivateFieldGet(this, _MessageDispatcherClass_dispatchers, "f").push(dispatcherId);
        service.onMessage({
            _dispatcherId: __classPrivateFieldGet(this, _MessageDispatcherClass_id, "f"),
            _serviceId: service.id,
            type: CONNECTION_ACKNOWLEDGE,
            payload: null
        });
    }
}, _MessageDispatcherClass_handleConnectionAcknowledge = function _MessageDispatcherClass_handleConnectionAcknowledge(event) {
    var _a, _b;
    LOGGER.info(`[${this.idShort}] parent acknowledge connection`);
    const service = new MessageServiceFrame_1.default((_a = event.data) === null || _a === void 0 ? void 0 : _a._dispatcherId, window.parent, (_b = event.data) === null || _b === void 0 ? void 0 : _b._serviceId);
    this.addService(service);
};
const MessageDispatcher = new MessageDispatcherClass();
exports.default = MessageDispatcher;
//# sourceMappingURL=MessageDispatcher.js.map