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
var _PluginProvideElement_plugin, _PluginProvideElement_name, _PluginProvideElement_url, _PluginProvideElement_type, _PluginProvideElement_element;
Object.defineProperty(exports, "__esModule", { value: true });
class PluginProvideElement {
    constructor(plugin, name, data) {
        _PluginProvideElement_plugin.set(this, void 0);
        _PluginProvideElement_name.set(this, void 0);
        _PluginProvideElement_url.set(this, void 0);
        _PluginProvideElement_type.set(this, void 0);
        _PluginProvideElement_element.set(this, void 0);
        __classPrivateFieldSet(this, _PluginProvideElement_plugin, plugin, "f");
        __classPrivateFieldSet(this, _PluginProvideElement_name, name, "f");
        __classPrivateFieldSet(this, _PluginProvideElement_url, data.url, "f");
        __classPrivateFieldSet(this, _PluginProvideElement_type, data.type, "f");
        __classPrivateFieldSet(this, _PluginProvideElement_element, data.element, "f");
    }
    get plugin() { return __classPrivateFieldGet(this, _PluginProvideElement_plugin, "f"); }
    get name() { return __classPrivateFieldGet(this, _PluginProvideElement_name, "f"); }
    get url() { return __classPrivateFieldGet(this, _PluginProvideElement_url, "f"); }
    get type() { return __classPrivateFieldGet(this, _PluginProvideElement_type, "f"); }
    get element() { return __classPrivateFieldGet(this, _PluginProvideElement_element, "f"); }
}
_PluginProvideElement_plugin = new WeakMap(), _PluginProvideElement_name = new WeakMap(), _PluginProvideElement_url = new WeakMap(), _PluginProvideElement_type = new WeakMap(), _PluginProvideElement_element = new WeakMap();
exports.default = PluginProvideElement;
//# sourceMappingURL=PluginProvideElement.js.map