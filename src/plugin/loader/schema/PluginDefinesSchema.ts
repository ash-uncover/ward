export const PluginDefinesSchema = {
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
}
