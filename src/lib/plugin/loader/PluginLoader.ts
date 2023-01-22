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
import { WardPlugin } from './model/PluginDataModel'

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

type PluginLoadState = 'NONE' | 'LOAD_ERROR' | 'VALIDATION_ERROR' | 'LOADED'
const PluginLoadStates: {
  NONE: PluginLoadState
  LOAD_ERROR: PluginLoadState
  VALIDATION_ERROR: PluginLoadState
  LOADED: PluginLoadState
} = {
  NONE: 'NONE',
  LOAD_ERROR: 'LOAD_ERROR',
  VALIDATION_ERROR: 'VALIDATION_ERROR',
  LOADED: 'LOADED'
}

interface WardPluginState {
  url: string
  state: 'NONE' | 'LOAD_ERROR' | 'VALIDATION_ERROR' | 'LOADED'
  errors: string[]
  data?: WardPlugin
  loadDate: number
}

export class PluginLoader {

  // Attributes //

  #urls: {
    [url: string]: WardPluginState
  } = {}

  // Constructors //

  constructor() {
  }

  // Getters & Setters //

  get urls () {
    return Object.keys(this.#urls)
  }

  // Public Methods //

  reset() {
    this.#urls = {}
  }

  hasData(url: string) {
    return !!this.#urls[url]
  }
  isLoaded(url: string) {
    return this.#urls[url]?.state === 'LOADED'
  }

  getData(url: string) {
    return this.#urls[url].data
  }
  getErrors(url: string) {
    return this.#urls[url].errors
  }
  getState(url: string) {
    return this.#urls[url].state
  }

  async load (url: string) {
    this.#urls[url] = {
      url,
      state: 'NONE',
      errors: [],
      loadDate: (new Date()).getTime()
    }

    let response: Response
    try {
      response = await this.#fetch(url)
    } catch (error) {
      this.#urls[url].state = 'LOAD_ERROR'
      this.#urls[url].errors.push(String(error))
      return false
    }

    let data: WardPlugin
    try {
      data = await this.#read(response)
      this.#urls[url].data = data
    } catch (error) {
      this.#urls[url].state = 'LOAD_ERROR'
      this.#urls[url].errors.push(String('Failed to read JSON data'))
      return false
    }

    const validator = ajv.getSchema<WardPlugin>('WardPluginSchema')!
    const valid = validator(data)
    if (!valid) {
      this.#urls[url].state = 'VALIDATION_ERROR'
      if (validator.errors) {
        this.#urls[url].errors.push(...validator.errors.map(error => String(error)))
      }
      return false
    }

    this.#urls[url].state = 'LOADED'
    return true
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
    const data: WardPlugin = await response.json()
    return data
  }
}