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
var _PluginDefine_plugin, _PluginDefine_name, _PluginDefine_properties, _PluginDefine_attributes, _PluginDefine_elements;
Object.defineProperty(exports, "__esModule", { value: true });
const PluginDefineAttribute_1 = __importDefault(require("./PluginDefineAttribute"));
const PluginDefineElement_1 = __importDefault(require("./PluginDefineElement"));
const PluginDefineProperty_1 = __importDefault(require("./PluginDefineProperty"));
class PluginDefine {
    constructor(plugin, name, data) {
        _PluginDefine_plugin.set(this, void 0);
        _PluginDefine_name.set(this, void 0);
        _PluginDefine_properties.set(this, void 0);
        _PluginDefine_attributes.set(this, void 0);
        _PluginDefine_elements.set(this, void 0);
        __classPrivateFieldSet(this, _PluginDefine_plugin, plugin, "f");
        __classPrivateFieldSet(this, _PluginDefine_name, `${plugin}/${name}`, "f");
        const properties = data.properties || {};
        __classPrivateFieldSet(this, _PluginDefine_properties, Object.keys(properties).map((propertyName) => {
            const property = properties[propertyName];
            return new PluginDefineProperty_1.default(plugin, propertyName, property);
        }), "f");
        const attributes = data.attributes || {};
        __classPrivateFieldSet(this, _PluginDefine_attributes, Object.keys(attributes).map((attributeName) => {
            const attribute = attributes[attributeName];
            return new PluginDefineAttribute_1.default(plugin, attributeName, attribute);
        }), "f");
        const elements = data.elements || {};
        __classPrivateFieldSet(this, _PluginDefine_elements, Object.keys(elements).map((elementName) => {
            const element = elements[elementName];
            return new PluginDefineElement_1.default(plugin, elementName, element);
        }), "f");
    }
    get plugin() { return __classPrivateFieldGet(this, _PluginDefine_plugin, "f"); }
    get name() { return __classPrivateFieldGet(this, _PluginDefine_name, "f"); }
    get properties() { return __classPrivateFieldGet(this, _PluginDefine_properties, "f").slice(); }
    getProperty(propertyId) {
        return this.properties.find(property => property.name === propertyId);
    }
    get attributes() { return __classPrivateFieldGet(this, _PluginDefine_attributes, "f").slice(); }
    getAttribute(attributeId) {
        return this.attributes.find(attribute => attribute.name === attributeId);
    }
    get elements() { return __classPrivateFieldGet(this, _PluginDefine_elements, "f").slice(); }
    getElement(elementId) {
        return this.elements.find(element => element.name === elementId);
    }
}
_PluginDefine_plugin = new WeakMap(), _PluginDefine_name = new WeakMap(), _PluginDefine_properties = new WeakMap(), _PluginDefine_attributes = new WeakMap(), _PluginDefine_elements = new WeakMap();
exports.default = PluginDefine;
//# sourceMappingURL=PluginDefine.js.map