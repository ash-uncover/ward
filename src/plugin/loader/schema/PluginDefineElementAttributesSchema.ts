export const PluginDefineElementAttributesSchema = {
    $id: 'WardPluginDefineElementAttributesSchema',
    title: 'Ward Plugin Define Element Attributes',
    description: 'Plugin Define Element Attributes',
    type: 'object',
    patternProperties: {
      '^.*$': {
        description: 'Define Element Attribute',
        type: ['string', 'number', 'boolean', 'array', 'object']
      }
    },
    additionalProperties: false
  }