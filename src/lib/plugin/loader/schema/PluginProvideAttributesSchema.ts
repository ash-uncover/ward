export const PluginProvideAttributesSchema = {
  $id: 'WardPluginProvideAttributesSchema',
  title: 'Ward Plugin Provide Attributes',
  description: 'Plugin Provide Attributes',
  type: 'object',
  patternProperties: {
    '^.*$': {
      description: 'Attribute value',
      type: ['string', 'number', 'boolean']
    }
  },
  additionalProperties: false
}
