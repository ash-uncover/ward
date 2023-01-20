export const PluginProvideSchema = {
  $id: 'https://ash-uncover.github.io/ward/ward-plugin-provide.schema.json',
  title: 'Ward Plugin Provide',
  description: 'Plugin Provide',
  type: 'object',
  properties: {
    properties: {
      $ref: 'https://ash-uncover.github.io/ward/ward-plugin-provide-properties.schema.json'
    },
    attributes: {
      $ref: 'https://ash-uncover.github.io/ward/ward-plugin-provide-attributes.schema.json'
    },
    elements: {
      $ref: 'https://ash-uncover.github.io/ward/ward-plugin-provide-elements.schema.json'
    }
  },
  additionalProperties: false
}
