"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PluginDefineElementSchema = void 0;
exports.PluginDefineElementSchema = {
    $id: 'WardPluginDefineElementSchema',
    title: 'Ward Plugin Define Element',
    description: 'Plugin Define Element',
    type: 'object',
    properties: {
        properties: {
            $ref: 'WardPluginDefineElementPropertiesSchema'
        },
        attributes: {
            $ref: 'WardPluginDefineElementAttributesSchema'
        },
        events: {
            $ref: 'WardPluginDefineElementEventsSchema'
        }
    },
    additionalProperties: false
};
//# sourceMappingURL=PluginDefineElementSchema.js.map