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
var _PluginProvideAttribute_plugin, _PluginProvideAttribute_name, _PluginProvideAttribute_value;
Object.defineProperty(exports, "__esModule", { value: true });
class PluginProvideAttribute {
    constructor(plugin, name, value) {
        _PluginProvideAttribute_plugin.set(this, void 0);
        _PluginProvideAttribute_name.set(this, void 0);
        _PluginProvideAttribute_value.set(this, void 0);
        __classPrivateFieldSet(this, _PluginProvideAttribute_plugin, plugin, "f");
        __classPrivateFieldSet(this, _PluginProvideAttribute_name, name, "f");
        __classPrivateFieldSet(this, _PluginProvideAttribute_value, value, "f");
    }
    get plugin() { return __classPrivateFieldGet(this, _PluginProvideAttribute_plugin, "f"); }
    get name() { return __classPrivateFieldGet(this, _PluginProvideAttribute_name, "f"); }
    get value() { return __classPrivateFieldGet(this, _PluginProvideAttribute_value, "f"); }
}
_PluginProvideAttribute_plugin = new WeakMap(), _PluginProvideAttribute_name = new WeakMap(), _PluginProvideAttribute_value = new WeakMap();
exports.default = PluginProvideAttribute;
//# sourceMappingURL=PluginProvideAttribute.js.map