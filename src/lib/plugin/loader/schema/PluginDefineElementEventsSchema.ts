export const PluginDefineElementEventsSchema = {
    $id: 'WardPluginDefineElementEventsSchema',
    title: 'Ward Plugin Define Element Events',
    description: 'Plugin Define Element Events',
    type: 'object',
    patternProperties: {
      '^.*$': {
        description: 'Define Element Event'
      }
    },
    additionalProperties: false
  }