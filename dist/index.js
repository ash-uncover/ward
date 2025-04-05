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
var _a;
var _WardClass_wardId, _WardClass_pluginManager, _WardClass_messageDispatcher, _WardClass_listeners, _WardClass_listenersPlugins, _WardClass_listenersServices, _WardClass_logConfig;
Object.defineProperty(exports, "__esModule", { value: true });
exports.WardVersion = exports.Ward = exports.ServiceEvent = void 0;
const js_utils_1 = require("@uncover/js-utils");
const PluginManager_1 = __importDefault(require("./plugin/PluginManager"));
const MessageDispatcher_1 = __importDefault(require("./message/MessageDispatcher"));
const ServiceEvent_1 = require("./message/services/ServiceEvent");
const js_utils_logger_1 = require("@uncover/js-utils-logger");
var ServiceEvent_2 = require("./message/services/ServiceEvent");
Object.defineProperty(exports, "ServiceEvent", { enumerable: true, get: function () { return ServiceEvent_2.ServiceEvent; } });
class WardClass {
    constructor(wardId, pluginManager, messageDispatcher) {
        _WardClass_wardId.set(this, void 0);
        _WardClass_pluginManager.set(this, void 0);
        _WardClass_messageDispatcher.set(this, void 0);
        _WardClass_listeners.set(this, []);
        _WardClass_listenersPlugins.set(this, []);
        _WardClass_listenersServices.set(this, []);
        _WardClass_logConfig.set(this, new js_utils_logger_1.LogConfig());
        __classPrivateFieldSet(this, _WardClass_wardId, wardId || js_utils_1.UUID.next(), "f");
        __classPrivateFieldSet(this, _WardClass_pluginManager, pluginManager || new PluginManager_1.default(undefined, this.logConfig), "f");
        __classPrivateFieldSet(this, _WardClass_messageDispatcher, messageDispatcher || new MessageDispatcher_1.default(undefined, this.logConfig), "f");
        __classPrivateFieldGet(this, _WardClass_pluginManager, "f").register(this.notifyPlugins.bind(this));
        __classPrivateFieldGet(this, _WardClass_messageDispatcher, "f").register(this.notifyServices.bind(this));
    }
    get id() {
        return __classPrivateFieldGet(this, _WardClass_wardId, "f");
    }
    get data() {
        return Object.assign(Object.assign({}, __classPrivateFieldGet(this, _WardClass_messageDispatcher, "f").data), __classPrivateFieldGet(this, _WardClass_pluginManager, "f").data);
    }
    get logConfig() {
        return __classPrivateFieldGet(this, _WardClass_logConfig, "f");
    }
    register(listener) {
        __classPrivateFieldGet(this, _WardClass_listeners, "f").push(listener);
        return () => this.unregister(listener);
    }
    unregister(listener) {
        __classPrivateFieldSet(this, _WardClass_listeners, js_utils_1.ArrayUtils.removeElement(__classPrivateFieldGet(this, _WardClass_listeners, "f"), listener), "f");
    }
    registerPlugins(listener) {
        __classPrivateFieldGet(this, _WardClass_listenersPlugins, "f").push(listener);
        return () => this.unregisterPlugins(listener);
    }
    unregisterPlugins(listener) {
        __classPrivateFieldSet(this, _WardClass_listenersPlugins, js_utils_1.ArrayUtils.removeElement(__classPrivateFieldGet(this, _WardClass_listenersPlugins, "f"), listener), "f");
    }
    notifyPlugins() {
        __classPrivateFieldGet(this, _WardClass_listenersPlugins, "f").forEach((listener) => {
            listener(this.data);
        });
        __classPrivateFieldGet(this, _WardClass_listeners, "f").forEach((listener) => {
            listener(this.data);
        });
    }
    registerServices(listener) {
        __classPrivateFieldGet(this, _WardClass_listenersServices, "f").push(listener);
        return () => this.unregisterServices(listener);
    }
    unregisterServices(listener) {
        __classPrivateFieldSet(this, _WardClass_listenersServices, js_utils_1.ArrayUtils.removeElement(__classPrivateFieldGet(this, _WardClass_listenersServices, "f"), listener), "f");
    }
    notifyServices() {
        __classPrivateFieldGet(this, _WardClass_listenersServices, "f").forEach((listener) => {
            listener(this.data);
        });
        __classPrivateFieldGet(this, _WardClass_listeners, "f").forEach((listener) => {
            listener(this.data);
        });
    }
    reset() {
        __classPrivateFieldGet(this, _WardClass_pluginManager, "f").reset();
        __classPrivateFieldGet(this, _WardClass_messageDispatcher, "f").reset();
    }
    loadPlugin(plugin) {
        __classPrivateFieldGet(this, _WardClass_pluginManager, "f").loadPlugin(plugin);
    }
    unloadPlugin(plugin) {
        __classPrivateFieldGet(this, _WardClass_pluginManager, "f").unloadPlugin(plugin);
    }
    addService(id) {
        return new ServiceEvent_1.ServiceEvent(__classPrivateFieldGet(this, _WardClass_messageDispatcher, "f"), id, this.logConfig);
    }
}
_WardClass_wardId = new WeakMap(), _WardClass_pluginManager = new WeakMap(), _WardClass_messageDispatcher = new WeakMap(), _WardClass_listeners = new WeakMap(), _WardClass_listenersPlugins = new WeakMap(), _WardClass_listenersServices = new WeakMap(), _WardClass_logConfig = new WeakMap();
let Version = "1.0.0";
let WardInstance;
if (!((_a = window.uncover) === null || _a === void 0 ? void 0 : _a.ward)) {
    WardInstance = new WardClass();
    window.uncover = window.uncover || {};
    window.uncover.ward = WardInstance;
    window.uncover.wardVersion = Version;
}
else {
    console.warn(`Ward is already registered with version ${window.uncover.wardVersion || "older than 0.2.21"}`);
    WardInstance = window.uncover.ward;
    Version = window.uncover.wardVersion;
}
exports.Ward = WardInstance;
exports.WardVersion = Version;
//# sourceMappingURL=index.js.map