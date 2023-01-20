export const PluginDefineSchema = {
  $id: 'WardPluginDefineSchema',
  title: 'Ward Plugin Define',
  description: 'Plugin Define',
  type: 'object',
  properties: {
    properties: {
      $ref: 'WardPluginDefinePropertiesSchema'
    },
    attributes: {
      $ref: 'WardPluginDefineAttributesSchema'
    },
    elements: {
      $ref: 'WardPluginDefineElementsSchema'
    }
  },
  additionalProperties: false
}
