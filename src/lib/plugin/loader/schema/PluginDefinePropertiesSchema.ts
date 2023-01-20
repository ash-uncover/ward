export const PluginDefinePropertiesSchema = {
  $id: 'WardPluginDefinePropertiesSchema',
  title: 'Ward Plugin Define Properties',
  description: 'Plugin Define Properties',
  type: 'object',
  patternProperties: {
    '^.*$': {
      description: 'Define Property',
      type: 'string',
      enum: ['string', 'number', 'boolean']
    }
  },
  additionalProperties: false
}