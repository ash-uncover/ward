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
var _PluginProviderAttribute_name, _PluginProviderAttribute_type, _PluginProviderAttribute_mandatory, _PluginProviderAttribute_array, _PluginProviderAttribute_value;
Object.defineProperty(exports, "__esModule", { value: true });
class PluginProviderAttribute {
    constructor(pluginUrl, attributeDefinition, attribute) {
        _PluginProviderAttribute_name.set(this, void 0);
        _PluginProviderAttribute_type.set(this, void 0);
        _PluginProviderAttribute_mandatory.set(this, void 0);
        _PluginProviderAttribute_array.set(this, void 0);
        _PluginProviderAttribute_value.set(this, void 0);
        __classPrivateFieldSet(this, _PluginProviderAttribute_name, attributeDefinition.name, "f");
        __classPrivateFieldSet(this, _PluginProviderAttribute_type, attributeDefinition.type, "f");
        __classPrivateFieldSet(this, _PluginProviderAttribute_mandatory, attributeDefinition.mandatory, "f");
        __classPrivateFieldSet(this, _PluginProviderAttribute_array, attributeDefinition.array, "f");
        const value = attribute.value;
        switch (__classPrivateFieldGet(this, _PluginProviderAttribute_type, "f")) {
            case 'url': {
                if (Array.isArray(value)) {
                    __classPrivateFieldSet(this, _PluginProviderAttribute_value, value.map((value) => `${pluginUrl}${value}`), "f");
                }
                else {
                    __classPrivateFieldSet(this, _PluginProviderAttribute_value, `${pluginUrl}${value}`, "f");
                }
                break;
            }
            default: {
                __classPrivateFieldSet(this, _PluginProviderAttribute_value, value, "f");
                break;
            }
        }
    }
    get name() { return __classPrivateFieldGet(this, _PluginProviderAttribute_name, "f"); }
    get type() { return __classPrivateFieldGet(this, _PluginProviderAttribute_type, "f"); }
    get mandatory() { return __classPrivateFieldGet(this, _PluginProviderAttribute_mandatory, "f"); }
    get array() { return __classPrivateFieldGet(this, _PluginProviderAttribute_array, "f"); }
    get value() { return __classPrivateFieldGet(this, _PluginProviderAttribute_value, "f"); }
}
_PluginProviderAttribute_name = new WeakMap(), _PluginProviderAttribute_type = new WeakMap(), _PluginProviderAttribute_mandatory = new WeakMap(), _PluginProviderAttribute_array = new WeakMap(), _PluginProviderAttribute_value = new WeakMap();
exports.default = PluginProviderAttribute;
//# sourceMappingURL=PluginProviderAttribute.js.map