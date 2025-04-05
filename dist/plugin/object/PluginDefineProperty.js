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
var _PluginDefineProperty_plugin, _PluginDefineProperty_name, _PluginDefineProperty_type, _PluginDefineProperty_mandatory, _PluginDefineProperty_array;
Object.defineProperty(exports, "__esModule", { value: true });
class PluginDefineProperty {
    constructor(plugin, name, type) {
        _PluginDefineProperty_plugin.set(this, void 0);
        _PluginDefineProperty_name.set(this, void 0);
        _PluginDefineProperty_type.set(this, void 0);
        _PluginDefineProperty_mandatory.set(this, void 0);
        _PluginDefineProperty_array.set(this, void 0);
        __classPrivateFieldSet(this, _PluginDefineProperty_plugin, plugin, "f");
        __classPrivateFieldSet(this, _PluginDefineProperty_array, false, "f");
        __classPrivateFieldSet(this, _PluginDefineProperty_mandatory, true, "f");
        let actualName = name;
        if (actualName.endsWith('?')) {
            __classPrivateFieldSet(this, _PluginDefineProperty_mandatory, false, "f");
            actualName = actualName.substring(0, actualName.length - 1);
        }
        __classPrivateFieldSet(this, _PluginDefineProperty_name, actualName, "f");
        let actualType = type;
        if (actualType.endsWith('[]')) {
            __classPrivateFieldSet(this, _PluginDefineProperty_array, true, "f");
            actualType = actualType.substring(0, actualType.length - 2);
        }
        __classPrivateFieldSet(this, _PluginDefineProperty_type, actualType, "f");
    }
    get plugin() { return __classPrivateFieldGet(this, _PluginDefineProperty_plugin, "f"); }
    get name() { return __classPrivateFieldGet(this, _PluginDefineProperty_name, "f"); }
    get type() { return __classPrivateFieldGet(this, _PluginDefineProperty_type, "f"); }
    get array() { return __classPrivateFieldGet(this, _PluginDefineProperty_array, "f"); }
    get mandatory() { return __classPrivateFieldGet(this, _PluginDefineProperty_mandatory, "f"); }
}
_PluginDefineProperty_plugin = new WeakMap(), _PluginDefineProperty_name = new WeakMap(), _PluginDefineProperty_type = new WeakMap(), _PluginDefineProperty_mandatory = new WeakMap(), _PluginDefineProperty_array = new WeakMap();
exports.default = PluginDefineProperty;
//# sourceMappingURL=PluginDefineProperty.js.map