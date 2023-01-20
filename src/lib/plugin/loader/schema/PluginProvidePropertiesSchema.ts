export const PluginProvidePropertiesSchema = {
  $id: 'https://ash-uncover.github.io/ward/ward-plugin-provide-properties.schema.json',
  title: 'Ward Plugin Provide Properties',
  description: 'Plugin Provide Properties',
  type: 'object',
  patternProperties: {
    '^.*$': {
      description: 'Provide Property',
      type: ['string', 'number', 'boolean']
      // anyOf: [
      //   { type: 'string' },
      //   { type: 'number' },
      //   { type: 'boolean' }
      // ]
    }
  },
  additionalProperties: false
}
