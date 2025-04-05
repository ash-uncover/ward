"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PluginDefineSchema = void 0;
exports.PluginDefineSchema = {
    $id: 'WardPluginDefineSchema',
    title: 'Ward Plugin Define',
    description: 'Plugin Define',
    type: 'object',
    properties: {
        properties: {
            $ref: 'WardPluginDefinePropertiesSchema'
        },
        attributes: {
            $ref: 'WardPluginDefineAttributesSchema'
        },
        elements: {
            $ref: 'WardPluginDefineElementsSchema'
        }
    },
    additionalProperties: false
};
//# sourceMappingURL=PluginDefineSchema.js.map