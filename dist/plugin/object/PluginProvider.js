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
var _PluginProvider_plugin, _PluginProvider_definition, _PluginProvider_name, _PluginProvider_attributes, _PluginProvider_elements, _PluginProvider_logger;
Object.defineProperty(exports, "__esModule", { value: true });
const Logger_1 = require("@uncover/js-utils-logger/dist/Logger");
const PluginProviderAttribute_1 = __importDefault(require("./PluginProviderAttribute"));
const PluginProviderElement_1 = __importDefault(require("./PluginProviderElement"));
class PluginProvider {
    constructor(pluginUrl, definition, provide, logConfig) {
        _PluginProvider_plugin.set(this, void 0);
        _PluginProvider_definition.set(this, void 0);
        _PluginProvider_name.set(this, void 0);
        _PluginProvider_attributes.set(this, []);
        _PluginProvider_elements.set(this, []);
        _PluginProvider_logger.set(this, void 0);
        __classPrivateFieldSet(this, _PluginProvider_logger, new Logger_1.Logger("PluginManager", logConfig), "f");
        __classPrivateFieldSet(this, _PluginProvider_plugin, provide.plugin, "f");
        __classPrivateFieldSet(this, _PluginProvider_definition, definition.name, "f");
        __classPrivateFieldSet(this, _PluginProvider_name, `${definition.name}/${provide.name}`, "f");
        definition.attributes.forEach((attributeDefinition) => {
            const { name, type, mandatory, array } = attributeDefinition;
            const attribute = provide.attributes.find((att) => att.name === name);
            if (mandatory && !attribute) {
                throw new Error(`Missing mandatory attribute '${name}'`);
            }
            if (!attribute) {
                return;
            }
            if (array !== Array.isArray(attribute.value)) {
                throw new Error(`Invalid attribute type '${name}', should ${array ? "" : "not "}be an array`);
            }
            __classPrivateFieldGet(this, _PluginProvider_attributes, "f").push(new PluginProviderAttribute_1.default(pluginUrl, attributeDefinition, attribute));
        });
        provide.attributes.forEach((attribute) => {
            const attributeDefinition = definition.attributes.find((att) => att.name === attribute.name);
            if (!attributeDefinition) {
                this.logger.warn(`${provide.plugin} - ${provide.name} - Attribute '${attribute.name}' is not defined`);
            }
        });
        definition.elements.forEach((elementDefinition) => {
            const { name } = elementDefinition;
            const element = provide.elements.find((elem) => elem.name === name);
            if (!element) {
                throw new Error(`Missing element '${name}'`);
            }
            __classPrivateFieldGet(this, _PluginProvider_elements, "f").push(new PluginProviderElement_1.default(pluginUrl, elementDefinition, element));
        });
        provide.elements.forEach((element) => {
            const elementDefinition = definition.elements.find((elem) => elem.name === element.name);
            if (!elementDefinition) {
                this.logger.warn(`${provide.plugin} - ${provide.name} - Element '${element.name}' is not defined`);
            }
        });
    }
    get plugin() {
        return __classPrivateFieldGet(this, _PluginProvider_plugin, "f");
    }
    get definition() {
        return __classPrivateFieldGet(this, _PluginProvider_definition, "f");
    }
    get name() {
        return __classPrivateFieldGet(this, _PluginProvider_name, "f");
    }
    get logger() {
        return __classPrivateFieldGet(this, _PluginProvider_logger, "f");
    }
    get attributes() {
        return __classPrivateFieldGet(this, _PluginProvider_attributes, "f").reduce((acc, attribute) => {
            acc[attribute.name] = attribute.value;
            return acc;
        }, {});
    }
    getAttributes() {
        return __classPrivateFieldGet(this, _PluginProvider_attributes, "f").slice();
    }
    getAttribute(attributeId) {
        return this.attributes[attributeId];
    }
    get elements() {
        return __classPrivateFieldGet(this, _PluginProvider_elements, "f").reduce((acc, element) => {
            acc[element.name] = {
                plugin: this.plugin,
                url: element.url,
                type: element.type,
                element: element.element,
            };
            return acc;
        }, {});
    }
    getElements() {
        return __classPrivateFieldGet(this, _PluginProvider_elements, "f").slice();
    }
    getElement(elementId) {
        return this.elements[elementId];
    }
}
_PluginProvider_plugin = new WeakMap(), _PluginProvider_definition = new WeakMap(), _PluginProvider_name = new WeakMap(), _PluginProvider_attributes = new WeakMap(), _PluginProvider_elements = new WeakMap(), _PluginProvider_logger = new WeakMap();
exports.default = PluginProvider;
//# sourceMappingURL=PluginProvider.js.map