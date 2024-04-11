export const PluginDefineElementPropertiesSchema = {
    $id: 'WardPluginDefineElementPropertiesSchema',
    title: 'Ward Plugin Define Element Properties',
    description: 'Plugin Define Element Properties',
    type: 'object',
    patternProperties: {
      '^.*$': {
        description: 'Define Element Property',
        type: ['string', 'number', 'boolean', 'array', 'object']
      }
    },
    additionalProperties: false
  }