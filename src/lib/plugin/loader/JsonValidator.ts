import Ajv from 'ajv'

import {
  PluginDefineAttributesSchema,
  PluginDefineElementSchema,
  PluginDefineElementsSchema,
  PluginDefinePropertiesSchema,
  PluginDefineSchema,
  PluginDefinesSchema,

  PluginProvideAttributesSchema,
  PluginProvideElementSchema,
  PluginProvideElementsSchema,
  PluginProvidePropertiesSchema,
  PluginProvideSchema,
  PluginProvidesSchema,

  PluginSchema,
} from './schema'

const ajv = new Ajv({
  allowUnionTypes: true,
  schemas: [
    PluginDefineAttributesSchema,
    PluginDefineElementSchema,
    PluginDefineElementsSchema,
    PluginDefinePropertiesSchema,
    PluginDefineSchema,
    PluginDefinesSchema,
    PluginProvideAttributesSchema,
    PluginProvideElementSchema,
    PluginProvideElementsSchema,
    PluginProvidePropertiesSchema,
    PluginProvideSchema,
    PluginProvidesSchema,
    PluginSchema,
  ]
})

export const validate = ajv.getSchema('https://ash-uncover.github.io/ward/ward-plugin.schema.json')!


