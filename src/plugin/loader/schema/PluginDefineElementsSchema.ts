export const PluginDefineElementsSchema = {
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
}