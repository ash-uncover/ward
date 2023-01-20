export const PluginProvideAttributesSchema = {
  $id: 'https://ash-uncover.github.io/ward/ward-plugin-provide-attributes.schema.json',
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
