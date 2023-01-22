export const PluginProvideAttributesSchema = {
  $id: 'WardPluginProvideAttributesSchema',
  title: 'Ward Plugin Provide Attributes',
  description: 'Plugin Provide Attributes',
  type: 'object',
  patternProperties: {
    '^.*$': {
      description: 'Attribute value',
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
