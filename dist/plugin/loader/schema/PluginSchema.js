"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PluginSchema = void 0;
exports.PluginSchema = {
    $id: 'WardPluginSchema',
    title: 'Ward Plugin',
    description: 'Plugin',
    type: 'object',
    properties: {
        name: {
            description: 'The unique identifier for a plugin',
            type: 'string'
        },
        url: {
            description: 'The url for a plugin',
            type: 'string'
        },
        dependencies: {
            description: 'Dependencies for the plugin',
            type: 'array',
            items: {
                type: 'string'
            },
            minItems: 0,
            uniqueItems: true
        },
        defines: {
            $ref: 'WardPluginDefinesSchema'
        },
        provides: {
            description: 'Providers',
            type: 'object',
            patternProperties: {
                '^.*$': {
                    $ref: 'WardPluginProvidesSchema'
                }
            }
        }
    },
    required: [
        'name',
        'url'
    ],
    additionalProperties: false
};
exports.default = exports.PluginSchema;
//# sourceMappingURL=PluginSchema.js.map