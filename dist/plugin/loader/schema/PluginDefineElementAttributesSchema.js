"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PluginDefineElementAttributesSchema = void 0;
exports.PluginDefineElementAttributesSchema = {
    $id: 'WardPluginDefineElementAttributesSchema',
    title: 'Ward Plugin Define Element Attributes',
    description: 'Plugin Define Element Attributes',
    type: 'object',
    patternProperties: {
        '^.*$': {
            description: 'Define Element Attribute',
            type: ['string', 'number', 'boolean', 'array', 'object']
        }
    },
    additionalProperties: false
};
//# sourceMappingURL=PluginDefineElementAttributesSchema.js.map