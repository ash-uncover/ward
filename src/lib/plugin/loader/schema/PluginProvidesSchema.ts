export const PluginProvidesSchema = {
  $id: 'https://ash-uncover.github.io/ward/ward-plugin-provides.schema.json',
  title: 'Ward Plugin Provides',
  description: 'Plugin Provides',
  type: 'object',
  patternProperties: {
    '^.*$': {
      $ref: 'https://ash-uncover.github.io/ward/ward-plugin-provide.schema.json'
    },
  },
  additionalProperties: false
}
