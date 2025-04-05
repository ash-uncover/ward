export const PluginDefineAttributesSchema = {
  $id: 'WardPluginDefineAttributesSchema',
  title: 'Ward Plugin Defines Attributes',
  description: 'Plugin Define Attributes',
  type: 'object',
  patternProperties: {
    '^.*$': {
      description: 'Define Attribute',
      type: 'string',
      enum: [
        'string',
        'string[]',
        'url',
        'url[]',
        'number',
        'number[]',
        'boolean',
        'boolean[]'
      ]
    }
  },
  additionalProperties: false
}
