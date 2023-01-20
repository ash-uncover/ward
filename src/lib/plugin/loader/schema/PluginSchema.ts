export const PluginSchema = {
  $id: 'WardPluginSchema',
  title: 'Ward Plugin',
  description: 'Plugin',
  type: 'object',
  properties: {

    name: {
      description: 'The unique identifier for a plugin',
      type: 'string'
    },

    url: {
      description: 'The url for a plugin',
      type: 'string'
    },

    dependencies: {
      description: 'Dependencies for the plugin',
      type: 'array',
      items: {
        type: 'string'
      },
      minItems: 0,
      uniqueItems: true
    },

    defines: {
      description: 'Definitions',
      type: 'object',
      patternProperties: {
        '^.*$': {
          $ref: 'WardPluginDefinesSchema'
        }
      },
      additionalProperties: false
    },

    provides: {
      description: 'Providers',
      type: 'object',
      patternProperties: {
        '^.*$': {
          $ref: 'WardPluginProvidesSchema'
        }
      },
      additionalProperties: false
    }
  },
  required: [
    'name',
    'url'
  ],
  additionalProperties: false
}

export default PluginSchema