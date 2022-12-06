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
var _MessageService_id, _MessageService_init, _MessageService_handle, _MessageService_closure;
Object.defineProperty(exports, "__esModule", { value: true });
const js_utils_1 = require("@uncover/js-utils");
const js_utils_logger_1 = __importDefault(require("@uncover/js-utils-logger"));
const MessageDispatcher_1 = __importDefault(require("./MessageDispatcher"));
const LOGGER = new js_utils_logger_1.default('MessageService', 0);
class MessageService {
    // Constructor //
    constructor(id) {
        // Attributes //
        _MessageService_id.set(this, void 0);
        _MessageService_init.set(this, false);
        _MessageService_handle.set(this, null);
        _MessageService_closure.set(this, null
        // Constructor //
        );
        __classPrivateFieldSet(this, _MessageService_id, id || `message-service-${js_utils_1.UUID.next()}`, "f");
    }
    // Getters & Setters //
    get id() {
        return __classPrivateFieldGet(this, _MessageService_id, "f");
    }
    get idShort() {
        return `[${MessageDispatcher_1.default.idShort}-${__classPrivateFieldGet(this, _MessageService_id, "f").substring(__classPrivateFieldGet(this, _MessageService_id, "f").length - 3)}]`;
    }
    // Public //
    init(handleMessage) {
        __classPrivateFieldSet(this, _MessageService_init, true, "f");
        __classPrivateFieldSet(this, _MessageService_handle, handleMessage, "f");
        __classPrivateFieldSet(this, _MessageService_closure, MessageDispatcher_1.default.addService(this), "f");
        LOGGER.info(`${this.idShort} starting`);
        return () => {
            LOGGER.info(`${this.idShort} closing`);
            __classPrivateFieldSet(this, _MessageService_init, false, "f");
            __classPrivateFieldSet(this, _MessageService_handle, null, "f");
            if (__classPrivateFieldGet(this, _MessageService_closure, "f")) {
                __classPrivateFieldGet(this, _MessageService_closure, "f").call(this);
            }
        };
    }
    onMessage(message) {
        if (__classPrivateFieldGet(this, _MessageService_init, "f") && __classPrivateFieldGet(this, _MessageService_handle, "f")) {
            LOGGER.info(`${this.idShort} onMessage`);
            __classPrivateFieldGet(this, _MessageService_handle, "f").call(this, message);
        }
        else {
            console.warn(`${this.idShort} onMessage but not init`);
        }
    }
    sendMessage(message) {
        LOGGER.info(`${this.idShort} sendMessage`);
        if (__classPrivateFieldGet(this, _MessageService_init, "f")) {
            MessageDispatcher_1.default.sendMessage(Object.assign(Object.assign({}, message), { _serviceId: this.id }));
        }
        else {
            console.warn(`${this.idShort} sendMessage but not init`);
        }
    }
}
_MessageService_id = new WeakMap(), _MessageService_init = new WeakMap(), _MessageService_handle = new WeakMap(), _MessageService_closure = new WeakMap();
exports.default = MessageService;
//# sourceMappingURL=MessageService.js.map