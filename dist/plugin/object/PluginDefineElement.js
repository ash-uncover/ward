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
var _PluginDefineElement_plugin, _PluginDefineElement_name, _PluginDefineElement_attributes, _PluginDefineElement_properties, _PluginDefineElement_events;
Object.defineProperty(exports, "__esModule", { value: true });
const PluginDefineElementAttribute_1 = __importDefault(require("./PluginDefineElementAttribute"));
const PluginDefineElementEvent_1 = __importDefault(require("./PluginDefineElementEvent"));
const PluginDefineElementProperty_1 = __importDefault(require("./PluginDefineElementProperty"));
class PluginDefineElement {
    constructor(plugin, name, data) {
        _PluginDefineElement_plugin.set(this, void 0);
        _PluginDefineElement_name.set(this, void 0);
        _PluginDefineElement_attributes.set(this, void 0);
        _PluginDefineElement_properties.set(this, void 0);
        _PluginDefineElement_events.set(this, void 0);
        __classPrivateFieldSet(this, _PluginDefineElement_plugin, plugin, "f");
        __classPrivateFieldSet(this, _PluginDefineElement_name, name, "f");
        const attributes = data.attributes || {};
        __classPrivateFieldSet(this, _PluginDefineElement_attributes, Object.keys(attributes).map((attributeKey) => new PluginDefineElementAttribute_1.default(attributeKey, String(attributes[attributeKey]))), "f");
        const properties = data.properties || {};
        __classPrivateFieldSet(this, _PluginDefineElement_properties, Object.keys(properties).map((propertyKey) => new PluginDefineElementProperty_1.default(propertyKey, String(properties[propertyKey]))), "f");
        const events = data.events || {};
        __classPrivateFieldSet(this, _PluginDefineElement_events, Object.keys(events).map((eventKey) => new PluginDefineElementEvent_1.default(eventKey)), "f");
    }
    get plugin() { return __classPrivateFieldGet(this, _PluginDefineElement_plugin, "f"); }
    get name() { return __classPrivateFieldGet(this, _PluginDefineElement_name, "f"); }
    get attributes() { return __classPrivateFieldGet(this, _PluginDefineElement_attributes, "f").slice(); }
    get properties() { return __classPrivateFieldGet(this, _PluginDefineElement_properties, "f").slice(); }
    get events() { return __classPrivateFieldGet(this, _PluginDefineElement_events, "f").slice(); }
}
_PluginDefineElement_plugin = new WeakMap(), _PluginDefineElement_name = new WeakMap(), _PluginDefineElement_attributes = new WeakMap(), _PluginDefineElement_properties = new WeakMap(), _PluginDefineElement_events = new WeakMap();
exports.default = PluginDefineElement;
//# sourceMappingURL=PluginDefineElement.js.map