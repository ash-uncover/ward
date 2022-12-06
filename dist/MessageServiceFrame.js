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
var _MessageServiceFrame_instances, _MessageServiceFrame_id, _MessageServiceFrame_dispatcherId, _MessageServiceFrame_window, _MessageServiceFrame_handleMessage;
Object.defineProperty(exports, "__esModule", { value: true });
const js_utils_1 = require("@uncover/js-utils");
const js_utils_logger_1 = __importDefault(require("@uncover/js-utils-logger"));
const MessageDispatcher_1 = __importDefault(require("./MessageDispatcher"));
const LOGGER = new js_utils_logger_1.default('MessageServiceFrame', 0);
class MessageServiceFrame {
    // Constructor //
    constructor(dispatcherId, wdow, id) {
        _MessageServiceFrame_instances.add(this);
        // Attributes //
        _MessageServiceFrame_id.set(this, void 0);
        _MessageServiceFrame_dispatcherId.set(this, void 0);
        _MessageServiceFrame_window.set(this, void 0);
        __classPrivateFieldSet(this, _MessageServiceFrame_dispatcherId, dispatcherId, "f");
        __classPrivateFieldSet(this, _MessageServiceFrame_id, id || `message-service-frame-${js_utils_1.UUID.next()}`, "f");
        __classPrivateFieldSet(this, _MessageServiceFrame_window, wdow, "f");
        window.addEventListener('message', __classPrivateFieldGet(this, _MessageServiceFrame_instances, "m", _MessageServiceFrame_handleMessage).bind(this));
    }
    // Getters & Setters //
    get id() {
        return __classPrivateFieldGet(this, _MessageServiceFrame_id, "f");
    }
    get idShort() {
        return `[${MessageDispatcher_1.default.idShort}-${__classPrivateFieldGet(this, _MessageServiceFrame_id, "f").substring(__classPrivateFieldGet(this, _MessageServiceFrame_id, "f").length - 3)}]`;
    }
    // Public Methods //
    onMessage(message) {
        LOGGER.info(`${this.idShort} onMessage`);
        __classPrivateFieldGet(this, _MessageServiceFrame_window, "f").postMessage(Object.assign(Object.assign({}, message), { _serviceId: __classPrivateFieldGet(this, _MessageServiceFrame_id, "f") }), '*');
    }
    sendMessage(message) {
        LOGGER.info(`${this.idShort} sendMessage`);
        MessageDispatcher_1.default.sendMessage(Object.assign(Object.assign({}, message), { _serviceId: this.id }));
    }
}
_MessageServiceFrame_id = new WeakMap(), _MessageServiceFrame_dispatcherId = new WeakMap(), _MessageServiceFrame_window = new WeakMap(), _MessageServiceFrame_instances = new WeakSet(), _MessageServiceFrame_handleMessage = function _MessageServiceFrame_handleMessage(event) {
    const data = event.data || {};
    if (data._serviceId && data._dispatcherId && data._dispatcherId === __classPrivateFieldGet(this, _MessageServiceFrame_dispatcherId, "f")) {
        this.sendMessage({
            _serviceId: __classPrivateFieldGet(this, _MessageServiceFrame_id, "f"),
            type: data.type,
            payload: data.payload
        });
    }
};
exports.default = MessageServiceFrame;
//# sourceMappingURL=MessageServiceFrame.js.map