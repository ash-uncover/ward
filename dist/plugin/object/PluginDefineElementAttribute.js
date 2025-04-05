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
var _PluginDefineElementAttribute_name, _PluginDefineElementAttribute_type;
Object.defineProperty(exports, "__esModule", { value: true });
class PluginDefineElementAttribute {
    constructor(name, type) {
        _PluginDefineElementAttribute_name.set(this, void 0);
        _PluginDefineElementAttribute_type.set(this, void 0);
        __classPrivateFieldSet(this, _PluginDefineElementAttribute_name, name, "f");
        __classPrivateFieldSet(this, _PluginDefineElementAttribute_type, type, "f");
    }
    get type() { return __classPrivateFieldGet(this, _PluginDefineElementAttribute_type, "f"); }
    get name() { return __classPrivateFieldGet(this, _PluginDefineElementAttribute_name, "f"); }
}
_PluginDefineElementAttribute_name = new WeakMap(), _PluginDefineElementAttribute_type = new WeakMap();
exports.default = PluginDefineElementAttribute;
//# sourceMappingURL=PluginDefineElementAttribute.js.map