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

export class PluginLoader {

  // Attributes //

  #urls: {
    [url: string]: any
  } = {}

  // Constructors //

  constructor() {
  }

  // Getters & Setters //

  get urls () {
    return Object.keys(this.#urls)
  }

  // Public Methods //

  hasData(url: string) {
    return !!this.#urls[url]
  }

  getData(url: string) {
    return this.#urls[url]
  }

  async load (url: string) {
    let response: Response
    try {
      response = await this.#fetch(url)
    } catch (error) {
      throw('Failed to fetch plugin')
    }

    let data: any
    try {
      data = await this.#read(response)
    } catch (error) {
      throw('Failed to read plugin data')
    }

    const valid = this.#validate(data)
    if (!valid) {
      throw('Failed to validate plugin data')
    }

    return data
  }

  // Internal Methods //

  async #fetch (url: string) {
    const response = await fetch(url, {
      method: 'GET',
      headers: new Headers()
    })
    return response
  }

  async #read (response: Response) {
    const data = await response.json()
    return data
  }

  #validate (data: any) {
    const validator = ajv.getSchema('https://ash-uncover.github.io/ward/ward-plugin.schema.json')!
    const result = validator(data)
    return result
  }
}