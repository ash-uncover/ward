export const PluginProvideElementsSchema = {
  $id: 'https://ash-uncover.github.io/ward/ward-plugin-provide-elements.schema.json',
  title: 'Ward Plugin Provide Elements',
  description: 'Plugin Provide Elements',
  type: 'object',
  patternProperties: {
    '^.*$': {
      $ref: 'https://ash-uncover.github.io/ward/ward-plugin-provide-element.schema.json'
    }
  },
  additionalProperties: false
}
