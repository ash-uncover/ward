export const PluginDefineElementSchema = {
  $id: 'WardPluginDefineElementSchema',
  title: 'Ward Plugin Define Element',
  description: 'Plugin Define Element',
  type: 'object',
  properties: {
    properties: {
      $ref: 'WardPluginDefineElementPropertiesSchema'
    },
    attributes: {
      $ref: 'WardPluginDefineElementAttributesSchema'
    },
    events: {
      $ref: 'WardPluginDefineElementEventsSchema'
    }
  },
  additionalProperties: false
}