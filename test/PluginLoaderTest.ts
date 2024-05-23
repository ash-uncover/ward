import {
  IPluginLoader,
  WardPluginState,
  PluginLoadStates
} from '../src/lib/plugin/loader/PluginLoader'

const TEST_DATA: Record<string, any> = {
  pluginMain: {
    name: 'plugin-main',
    url: './plugin-main',
    dependencies: [
      'pluginSub1',
      'pluginSub2'
    ],
    defines: {
      defineMain: {
        attributes: {
          attributeMain: 'string'
        },
        elements: {
          elementMain: {}
        }
      }
    }
  },
  pluginSub1: {
    name: 'plugin-sub-1',
    url: './plugin-sub-1',
    dependencies: [],
    provides: {
      'plugin-main/defineMain': {
        sub1: {
          attributes: {
            attributeMain: 'sub1 att1'
          },
          elements: {
            elementMain: {
              url: '#',
              type: 'iframe'
            }
          }
        }
      }
    }
  },
  pluginSub2: {
    name: 'plugin-sub-2',
    url: './plugin-sub-2',
    dependencies: [],
    provides: {
      'plugin-main/defineMain': {
        sub2: {
          attributes: {
            attributeMain: 'sub2 att2'
          },
          elements: {
            elementMain: {
              url: '#',
              type: 'iframe'
            }
          }
        }
      }
    }
  }
}

class PluginLoaderTest implements IPluginLoader {

  // Attributes //

  #urls: {
    [url: string]: WardPluginState
  } = {}
  #excludedUrls: string[] = []

  // Constructors //

  constructor() {
  }

  // Getters & Setters //

  get urls() {
    return Object.keys(this.#urls)
  }

  // Public Methods //

  reset() {
    this.#urls = {}
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

  async load(url: string) {
    this.#urls[url] = {
      url,
      state: 'NONE',
      errors: [],
      loadDate: (new Date()).getTime()
    }

    if (this.#excludedUrls.includes(url)) {
      this.#urls[url].state = PluginLoadStates.EXCLUDED
      return false
    }

    let data: any
    try {
      data = TEST_DATA[url]
      if (!data) {
        throw new Error('cannot load')
      }
      this.#urls[url].data = data
    } catch (error) {
      this.#urls[url].state = PluginLoadStates.LOAD_ERROR
      this.#urls[url].errors.push(String(error))
      return false
    }

    this.#urls[url].state = PluginLoadStates.LOADED
    return true
  }
}

export default PluginLoaderTest
