export const PluginProvideSchema = {
  $id: 'WardPluginProvideSchema',
  title: 'Ward Plugin Provide',
  description: 'Plugin Provide',
  type: 'object',
  properties: {
    properties: {
      $ref: 'WardPluginProvidePropertiesSchema'
    },
    attributes: {
      $ref: 'WardPluginProvideAttributesSchema'
    },
    elements: {
      $ref: 'WardPluginProvideElementsSchema'
    }
  },
  additionalProperties: false
}
