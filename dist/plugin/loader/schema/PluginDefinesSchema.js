"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PluginDefinesSchema = void 0;
exports.PluginDefinesSchema = {
    $id: 'WardPluginDefinesSchema',
    title: 'Ward Plugin Defines',
    description: 'Plugin Defines',
    type: 'object',
    patternProperties: {
        '^.*$': {
            $ref: 'WardPluginDefineSchema'
        },
    },
    additionalProperties: false
};
//# sourceMappingURL=PluginDefinesSchema.js.map