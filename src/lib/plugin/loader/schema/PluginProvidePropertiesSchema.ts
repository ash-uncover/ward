export const PluginProvidePropertiesSchema = {
  $id: 'WardPluginProvidePropertiesSchema',
  title: 'Ward Plugin Provide Properties',
  description: 'Plugin Provide Properties',
  type: 'object',
  patternProperties: {
    '^.*$': {
      description: 'Provide Property',
      oneOf: [{
        type: ['string', 'number', 'boolean']
      }, {
        type: 'array',
        items: { type: 'string' }
      }, {
        type: 'array',
        items: { type: 'number' }
      }, {
        type: 'array',
        items: { type: 'boolean' }
      }]
    }
  },
  additionalProperties: false
}
