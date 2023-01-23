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

import {
  WardPlugin
} from './model/PluginDataModel'

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

export const validate = ajv.getSchema('WardPluginSchema')!

export const getValidator = () => ajv.getSchema<WardPlugin>('WardPluginSchema')!


