"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PluginDefineElementsSchema = void 0;
exports.PluginDefineElementsSchema = {
    $id: 'WardPluginDefineElementsSchema',
    title: 'Ward Plugin Define Elements',
    description: 'Plugin Define Elements',
    type: 'object',
    patternProperties: {
        '^.*$': {
            $ref: 'WardPluginDefineElementSchema'
        }
    },
    additionalProperties: false
};
//# sourceMappingURL=PluginDefineElementsSchema.js.map