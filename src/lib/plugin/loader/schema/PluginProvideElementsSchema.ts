export const PluginProvideElementsSchema = {
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
}
