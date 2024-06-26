import { WardPlugin } from './model/PluginDataModel'
import { getValidator } from './JsonValidator'


export type PluginLoadState =
  |'NONE'
  | 'LOAD_ERROR'
  | 'VALIDATION_ERROR'
  | 'LOADED'
  | 'EXCLUDED'
export const PluginLoadStates: {
  NONE: PluginLoadState
  EXCLUDED: PluginLoadState
  LOAD_ERROR: PluginLoadState
  VALIDATION_ERROR: PluginLoadState
  LOADED: PluginLoadState
} = {
  NONE: 'NONE',
  EXCLUDED: 'EXCLUDED',
  LOAD_ERROR: 'LOAD_ERROR',
  VALIDATION_ERROR: 'VALIDATION_ERROR',
  LOADED: 'LOADED'
}

export interface WardPluginState {
  url: string
  state: PluginLoadState
  errors: string[]
  data?: WardPlugin
  loadDate: number
}

export interface IPluginLoader {
  urls: string[]
  reset: () => void
  hasData: (url: string) => boolean
  isLoaded: (url: string) => boolean
  getData: (url: string) => WardPlugin | undefined
  getErrors: (url: string) => string[]
  getState: (url: string) => PluginLoadState
  load: (url: string) => Promise<boolean>
  exclude: (url: string) => void
  include: (url: string) => void
}
class PluginLoader implements IPluginLoader {

  // Attributes //

  #urls: {
    [url: string]: WardPluginState
  } = {}
  #excludedUrls: string[] = []

  // Constructors //

  constructor() {
  }

  // Getters & Setters //

  get urls () {
    return Object.keys(this.#urls)
  }
  get excludedUrls () {
    return this.#excludedUrls.slice()
  }

  // Public Methods //

  reset(resetExcluded: boolean = false) {
    this.#urls = {}
    if (resetExcluded) {
      this.#excludedUrls = []
    }
  }

  hasData(url: string) {
    return !!this.#urls[url]?.data
  }
  isLoaded(url: string) {
    return this.#urls[url]?.state === PluginLoadStates.LOADED
  }

  getData(url: string) {
    return this.#urls[url]?.data
  }
  getErrors(url: string) {
    return this.#urls[url]?.errors || []
  }
  getState(url: string) {
    return this.#urls[url]?.state || PluginLoadStates.NONE
  }

  exclude (url:string) {
    if (!this.#excludedUrls.includes(url)) {
      this.#excludedUrls.push(url)
    }
  }
  include (url:string) {
    const index = this.#excludedUrls.indexOf(url)
    if (index > -1) {
      this.#excludedUrls.splice(index, 1)
    }
  }

  async load (url: string) {
    this.#urls[url] = {
      url,
      state: PluginLoadStates.NONE,
      errors: [],
      loadDate: (new Date()).getTime()
    }

    if (this.#excludedUrls.includes(url)) {
      this.#urls[url].state = PluginLoadStates.EXCLUDED
      return false
    }

    let response: Response
    try {
      response = await this.#fetch(url)
    } catch (error) {
      this.#urls[url].state = PluginLoadStates.LOAD_ERROR
      this.#urls[url].errors.push(String(error))
      return false
    }

    let data: WardPlugin
    try {
      data = await this.#read(response)
      this.#urls[url].data = data
    } catch (error) {
      this.#urls[url].state = PluginLoadStates.LOAD_ERROR
      this.#urls[url].errors.push(String(error))
      return false
    }

    const validator = getValidator()
    const valid = validator(data)
    if (!valid) {
      this.#urls[url].state = PluginLoadStates.VALIDATION_ERROR
      if (validator.errors) {
        this.#urls[url].errors.push(...validator.errors.map(error => JSON.stringify(error, null, 2)))
      }
      return false
    }

    this.#urls[url].state = PluginLoadStates.LOADED
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

export default PluginLoader
