import Ajv from 'ajv'

import {
  PluginDefineAttributesSchema,
  PluginDefineElementSchema,
  PluginDefineElementAttributesSchema,
  PluginDefineElementEventsSchema,
  PluginDefineElementPropertiesSchema,
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
    PluginDefineElementAttributesSchema,
    PluginDefineElementEventsSchema,
    PluginDefineElementPropertiesSchema,
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


