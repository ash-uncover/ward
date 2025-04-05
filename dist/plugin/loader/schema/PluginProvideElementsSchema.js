"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PluginProvideElementsSchema = void 0;
exports.PluginProvideElementsSchema = {
    $id: 'WardPluginProvideElementsSchema',
    title: 'Ward Plugin Provide Elements',
    description: 'Plugin Provide Elements',
    type: 'object',
    patternProperties: {
        '^.*$': {
            $ref: 'WardPluginProvideElementSchema'
        }
    },
    additionalProperties: false
};
//# sourceMappingURL=PluginProvideElementsSchema.js.map