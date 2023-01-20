export const PluginProvideElementSchema = {
  $id: 'WardPluginProvideElementSchema',
  title: 'Ward Plugin Provide Element',
  description: 'Plugin Provide Element',
  type: 'object',
  properties: {
    url: {
      type: 'string'
    },
    type: {
      type: 'string',
      enum: ['iframe', 'webcomponent', 'component']
    },
    element: {
      type: 'string'
    }
  },
  required: [
    'url',
    'type'
  ],
  additionalProperties: false
}
