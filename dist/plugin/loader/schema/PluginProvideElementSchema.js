"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PluginProvideElementSchema = void 0;
exports.PluginProvideElementSchema = {
    $id: 'WardPluginProvideElementSchema',
    title: 'Ward Plugin Provide Element',
    description: 'Plugin Provide Element',
    type: 'object',
    properties: {
        url: {
            type: 'string'
        },
        type: {
            type: 'string',
            enum: ['iframe', 'webcomponent', 'component']
        },
        element: {
            type: 'string'
        }
    },
    required: [
        'url',
        'type'
    ],
    additionalProperties: false
};
//# sourceMappingURL=PluginProvideElementSchema.js.map