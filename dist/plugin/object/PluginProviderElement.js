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
var _PluginProviderElement_name, _PluginProviderElement_url, _PluginProviderElement_type, _PluginProviderElement_element;
Object.defineProperty(exports, "__esModule", { value: true });
class PluginProviderElement {
    constructor(pluginUrl, elementDefinition, element) {
        _PluginProviderElement_name.set(this, void 0);
        _PluginProviderElement_url.set(this, void 0);
        _PluginProviderElement_type.set(this, void 0);
        _PluginProviderElement_element.set(this, void 0);
        __classPrivateFieldSet(this, _PluginProviderElement_name, elementDefinition.name, "f");
        __classPrivateFieldSet(this, _PluginProviderElement_url, `${pluginUrl}${element.url}`, "f");
        __classPrivateFieldSet(this, _PluginProviderElement_type, element.type, "f");
        __classPrivateFieldSet(this, _PluginProviderElement_element, element.element, "f");
    }
    get name() { return __classPrivateFieldGet(this, _PluginProviderElement_name, "f"); }
    get url() { return __classPrivateFieldGet(this, _PluginProviderElement_url, "f"); }
    get type() { return __classPrivateFieldGet(this, _PluginProviderElement_type, "f"); }
    get element() { return __classPrivateFieldGet(this, _PluginProviderElement_element, "f"); }
}
_PluginProviderElement_name = new WeakMap(), _PluginProviderElement_url = new WeakMap(), _PluginProviderElement_type = new WeakMap(), _PluginProviderElement_element = new WeakMap();
exports.default = PluginProviderElement;
//# sourceMappingURL=PluginProviderElement.js.map