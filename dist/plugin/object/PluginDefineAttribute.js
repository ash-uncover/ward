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
var _PluginDefineAttribute_plugin, _PluginDefineAttribute_name, _PluginDefineAttribute_type, _PluginDefineAttribute_mandatory, _PluginDefineAttribute_array;
Object.defineProperty(exports, "__esModule", { value: true });
class PluginDefineAttribute {
    constructor(plugin, name, type) {
        _PluginDefineAttribute_plugin.set(this, void 0);
        _PluginDefineAttribute_name.set(this, void 0);
        _PluginDefineAttribute_type.set(this, void 0);
        _PluginDefineAttribute_mandatory.set(this, void 0);
        _PluginDefineAttribute_array.set(this, void 0);
        __classPrivateFieldSet(this, _PluginDefineAttribute_plugin, plugin, "f");
        __classPrivateFieldSet(this, _PluginDefineAttribute_array, false, "f");
        __classPrivateFieldSet(this, _PluginDefineAttribute_mandatory, true, "f");
        let actualName = name;
        if (actualName.endsWith('?')) {
            __classPrivateFieldSet(this, _PluginDefineAttribute_mandatory, false, "f");
            actualName = actualName.substring(0, actualName.length - 1);
        }
        __classPrivateFieldSet(this, _PluginDefineAttribute_name, actualName, "f");
        let actualType = type;
        if (actualType.endsWith('[]')) {
            __classPrivateFieldSet(this, _PluginDefineAttribute_array, true, "f");
            actualType = actualType.substring(0, actualType.length - 2);
        }
        __classPrivateFieldSet(this, _PluginDefineAttribute_type, actualType, "f");
    }
    get plugin() { return __classPrivateFieldGet(this, _PluginDefineAttribute_plugin, "f"); }
    get name() { return __classPrivateFieldGet(this, _PluginDefineAttribute_name, "f"); }
    get type() { return __classPrivateFieldGet(this, _PluginDefineAttribute_type, "f"); }
    get array() { return __classPrivateFieldGet(this, _PluginDefineAttribute_array, "f"); }
    get mandatory() { return __classPrivateFieldGet(this, _PluginDefineAttribute_mandatory, "f"); }
}
_PluginDefineAttribute_plugin = new WeakMap(), _PluginDefineAttribute_name = new WeakMap(), _PluginDefineAttribute_type = new WeakMap(), _PluginDefineAttribute_mandatory = new WeakMap(), _PluginDefineAttribute_array = new WeakMap();
exports.default = PluginDefineAttribute;
//# sourceMappingURL=PluginDefineAttribute.js.map