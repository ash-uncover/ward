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
var _PluginProvide_plugin, _PluginProvide_define, _PluginProvide_name, _PluginProvide_attributes, _PluginProvide_elements;
Object.defineProperty(exports, "__esModule", { value: true });
const PluginProvideAttribute_1 = __importDefault(require("./PluginProvideAttribute"));
const PluginProvideElement_1 = __importDefault(require("./PluginProvideElement"));
class PluginProvide {
    constructor(plugin, define, name, data) {
        _PluginProvide_plugin.set(this, void 0);
        _PluginProvide_define.set(this, void 0);
        _PluginProvide_name.set(this, void 0);
        _PluginProvide_attributes.set(this, void 0);
        _PluginProvide_elements.set(this, void 0);
        __classPrivateFieldSet(this, _PluginProvide_plugin, plugin, "f");
        __classPrivateFieldSet(this, _PluginProvide_define, define, "f");
        __classPrivateFieldSet(this, _PluginProvide_name, name, "f");
        const attributes = data.attributes || {};
        __classPrivateFieldSet(this, _PluginProvide_attributes, Object.keys(attributes).map((attributeName) => {
            const attribute = attributes[attributeName];
            return new PluginProvideAttribute_1.default(plugin, attributeName, attribute);
        }), "f");
        const elements = data.elements || {};
        __classPrivateFieldSet(this, _PluginProvide_elements, Object.keys(elements).map((elementName) => {
            const element = elements[elementName];
            return new PluginProvideElement_1.default(plugin, elementName, element);
        }), "f");
    }
    get plugin() { return __classPrivateFieldGet(this, _PluginProvide_plugin, "f"); }
    get define() { return __classPrivateFieldGet(this, _PluginProvide_define, "f"); }
    get name() { return __classPrivateFieldGet(this, _PluginProvide_name, "f"); }
    get attributes() { return __classPrivateFieldGet(this, _PluginProvide_attributes, "f").slice(); }
    getAttribute(attributeId) {
        return this.attributes.find(attribute => attribute.name === attributeId);
    }
    get elements() { return __classPrivateFieldGet(this, _PluginProvide_elements, "f").slice(); }
    getElement(elementId) {
        return this.elements.find(element => element.name === elementId);
    }
}
_PluginProvide_plugin = new WeakMap(), _PluginProvide_define = new WeakMap(), _PluginProvide_name = new WeakMap(), _PluginProvide_attributes = new WeakMap(), _PluginProvide_elements = new WeakMap();
exports.default = PluginProvide;
//# sourceMappingURL=PluginProvide.js.map