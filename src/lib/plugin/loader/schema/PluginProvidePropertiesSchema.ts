export const PluginProvidePropertiesSchema = {
  $id: 'WardPluginProvidePropertiesSchema',
  title: 'Ward Plugin Provide Properties',
  description: 'Plugin Provide Properties',
  type: 'object',
  patternProperties: {
    '^.*$': {
      description: 'Provide Property',
      type: ['string', 'number', 'boolean']
    }
  },
  additionalProperties: false
}
