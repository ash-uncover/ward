"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PluginProvideSchema = void 0;
exports.PluginProvideSchema = {
    $id: 'WardPluginProvideSchema',
    title: 'Ward Plugin Provide',
    description: 'Plugin Provide',
    type: 'object',
    properties: {
        properties: {
            $ref: 'WardPluginProvidePropertiesSchema'
        },
        attributes: {
            $ref: 'WardPluginProvideAttributesSchema'
        },
        elements: {
            $ref: 'WardPluginProvideElementsSchema'
        }
    },
    additionalProperties: false
};
//# sourceMappingURL=PluginProvideSchema.js.map