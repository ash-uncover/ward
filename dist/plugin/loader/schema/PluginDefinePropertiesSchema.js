"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PluginDefinePropertiesSchema = void 0;
exports.PluginDefinePropertiesSchema = {
    $id: 'WardPluginDefinePropertiesSchema',
    title: 'Ward Plugin Define Properties',
    description: 'Plugin Define Properties',
    type: 'object',
    patternProperties: {
        '^.*$': {
            description: 'Define Property',
            type: 'string',
            enum: [
                'string',
                'string[]',
                'url',
                'url[]',
                'number',
                'number[]',
                'boolean',
                'boolean[]'
            ]
        }
    },
    additionalProperties: false
};
//# sourceMappingURL=PluginDefinePropertiesSchema.js.map