"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PluginProvidesSchema = void 0;
exports.PluginProvidesSchema = {
    $id: 'WardPluginProvidesSchema',
    title: 'Ward Plugin Provides',
    description: 'Plugin Provides',
    type: 'object',
    patternProperties: {
        '^.*$': {
            $ref: 'WardPluginProvideSchema'
        },
    },
    additionalProperties: false
};
//# sourceMappingURL=PluginProvidesSchema.js.map