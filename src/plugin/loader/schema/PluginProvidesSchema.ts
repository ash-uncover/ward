export const PluginProvidesSchema = {
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
}
