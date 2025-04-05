"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PluginDefineElementPropertiesSchema = void 0;
exports.PluginDefineElementPropertiesSchema = {
    $id: 'WardPluginDefineElementPropertiesSchema',
    title: 'Ward Plugin Define Element Properties',
    description: 'Plugin Define Element Properties',
    type: 'object',
    patternProperties: {
        '^.*$': {
            description: 'Define Element Property',
            type: ['string', 'number', 'boolean', 'array', 'object']
        }
    },
    additionalProperties: false
};
//# sourceMappingURL=PluginDefineElementPropertiesSchema.js.map