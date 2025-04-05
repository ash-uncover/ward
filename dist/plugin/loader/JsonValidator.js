"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getValidator = exports.validate = void 0;
const ajv_1 = __importDefault(require("ajv"));
const schema_1 = require("./schema");
const ajv = new ajv_1.default({
    allowUnionTypes: true,
    schemas: [
        schema_1.PluginDefineAttributesSchema,
        schema_1.PluginDefineElementAttributesSchema,
        schema_1.PluginDefineElementEventsSchema,
        schema_1.PluginDefineElementPropertiesSchema,
        schema_1.PluginDefineElementSchema,
        schema_1.PluginDefineElementsSchema,
        schema_1.PluginDefinePropertiesSchema,
        schema_1.PluginDefineSchema,
        schema_1.PluginDefinesSchema,
        schema_1.PluginProvideAttributesSchema,
        schema_1.PluginProvideElementSchema,
        schema_1.PluginProvideElementsSchema,
        schema_1.PluginProvidePropertiesSchema,
        schema_1.PluginProvideSchema,
        schema_1.PluginProvidesSchema,
        schema_1.PluginSchema,
    ]
});
exports.validate = ajv.getSchema('WardPluginSchema');
const getValidator = () => ajv.getSchema('WardPluginSchema');
exports.getValidator = getValidator;
//# sourceMappingURL=JsonValidator.js.map