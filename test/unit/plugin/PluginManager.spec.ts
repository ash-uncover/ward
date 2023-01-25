import PluginManager from '../../../src/lib/plugin/PluginManager'
import { LogConfig } from '@uncover/js-utils-logger'
import Plugin from '../../../src/lib/plugin/object/Plugin'
import PluginDefine from '../../../src/lib/plugin/object/PluginDefine'
import PluginProvider from '../../../src/lib/plugin/object/PluginProvider'
import PluginProvide from '../../../src/lib/plugin/object/PluginProvide'
import PluginLoader from '../../../src/lib/plugin/loader/PluginLoader'

LogConfig.off()

describe('PluginManager', () => {

  /* TEST DATA */

  let mockPluginLoader: PluginLoader
  let mockPluginLoaderReset = jest.fn()
  let mockPluginLoaderHasData = jest.fn()
  let mockPluginLoaderIsLoaded = jest.fn()
  let mockPluginLoaderGetData = jest.fn()
  let mockPluginLoaderGetErrors = jest.fn()
  let mockPluginLoaderGetState = jest.fn()
  let mockPluginLoaderLoad = jest.fn()

  let PluginMgr: PluginManager

  /* TEST SETUP */

  beforeEach(() => {
    // @ts-ignore
    mockPluginLoader = {
      reset: mockPluginLoaderReset,
      urls: [],
      hasData: mockPluginLoaderHasData,
      isLoaded: mockPluginLoaderIsLoaded,
      getData: mockPluginLoaderGetData,
      getErrors: mockPluginLoaderGetErrors,
      getState: mockPluginLoaderGetState,
      load: mockPluginLoaderLoad
    }
    PluginMgr = new PluginManager(mockPluginLoader)
  })

  afterEach(() => {
    jest.restoreAllMocks()
  })

  /* TEST CASES */


  describe('PluginManager', () => {

    beforeEach(() => {
    })

    afterEach(() => {
    })

    describe('constructor', () => {

      test('initial values', () => {
        // Declaration
        // Execution
        PluginMgr = new PluginManager()
        // Assertion
        expect(PluginMgr.retryDelay).toEqual(-1)
        expect(PluginMgr.plugins).toEqual({})
        expect(PluginMgr.roots).toEqual({})
        expect(PluginMgr.definitions).toEqual({})
        expect(PluginMgr.providers).toEqual({})

        expect(PluginMgr.data).toEqual({
          urls: {},
          roots: {},
          plugins: {},
          definitions: {},
          providers: {}
        })
      })
    })

    describe('retryDelay', () => {

      test('set', () => {
        // Declaration
        const delay = 5000
        // Execution
        PluginMgr.retryDelay = delay
        // Assertion
        expect(PluginMgr.retryDelay).toBe(delay)
      })
    })

    describe('loader access', () => {

      test('Properly build info from the loader', async () => {
        // Declaration
        // @ts-ignore
        mockPluginLoader.urls = ['1', '2']
        mockPluginLoaderGetData.mockImplementation((url) => `data${url}`)
        mockPluginLoaderGetState.mockImplementation((url) => `state${url}`)
        mockPluginLoaderGetErrors.mockImplementation((url) => `errors${url}`)
        // Execution
        // Assertion
        expect(PluginMgr.urls).toEqual({
          1: {
            data: 'data1',
            state: 'state1',
            errors: 'errors1'
          },
          2: {
            data: 'data2',
            state: 'state2',
            errors: 'errors2'
          }
        })
      })
    })

    describe('loadPlugin', () => {

      test('when plugin with same url is already loaded', async () => {
        // Declaration
        const url = 'url'
        mockPluginLoaderHasData.mockImplementation(() => true)
        // Execution
        await PluginMgr.loadPlugin(url)
        // Assertion
        expect(PluginMgr.urls).toEqual({})
        expect(PluginMgr.plugins).toEqual({})
        expect(PluginMgr.roots).toEqual({})
        expect(PluginMgr.definitions).toEqual({})
        expect(PluginMgr.providers).toEqual({})
      })

      test('when plugin fails to load', async () => {
        // Declaration
        const url = 'url'
        mockPluginLoaderHasData.mockImplementation(() => false)
        mockPluginLoaderLoad.mockImplementation(() => false)
        mockPluginLoaderGetErrors.mockImplementation(() => [])
        // Execution
        await PluginMgr.loadPlugin(url)
        // Assertion
        expect(PluginMgr.getPluginByUrl(url)).toBeUndefined()
        expect(PluginMgr.urls).toEqual({})
        expect(PluginMgr.plugins).toEqual({})
        expect(PluginMgr.roots).toEqual({})
        expect(PluginMgr.definitions).toEqual({})
        expect(PluginMgr.providers).toEqual({})
      })

      test('when plugin loads normally', async () => {
        // Declaration
        const url = 'url'
        const data = {
          name: 'pluginName',
          url: 'pluginUrl'
        }
        mockPluginLoaderHasData.mockImplementation(() => false)
        mockPluginLoaderLoad.mockImplementation(() => true)
        mockPluginLoaderGetErrors.mockImplementation(() => [])
        mockPluginLoaderGetData.mockImplementation(() => data)
        // Execution
        await PluginMgr.loadPlugin(url)
        // Assertion
        const expectedPlugin = new Plugin(url, data)
        expect(PluginMgr.getData(url)).toEqual(data)
        expect(PluginMgr.getPluginByUrl(url)).toEqual(expectedPlugin)
        expect(PluginMgr.plugins).toEqual({ [data.name]: expectedPlugin })
        expect(PluginMgr.roots).toEqual({ [data.name]: expectedPlugin })
        expect(PluginMgr.definitions).toEqual({})
        expect(PluginMgr.providers).toEqual({})
      })

      test('when plugin with same name is already loaded', async () => {
        // Declaration
        const url = 'url'
        const data = {
          name: 'pluginName',
          url: 'pluginUrl'
        }
        mockPluginLoaderHasData.mockImplementation(() => false)
        mockPluginLoaderLoad.mockImplementation(() => true)
        mockPluginLoaderGetErrors.mockImplementation(() => [])
        mockPluginLoaderGetData.mockImplementation(() => data)
        // Execution
        await PluginMgr.loadPlugin(url)
        await PluginMgr.loadPlugin('url2')
        // Assertion
        expect(PluginMgr.plugins).toEqual({ [data.name]: new Plugin(url, data) })
        expect(PluginMgr.roots).toEqual({ [data.name]: new Plugin(url, data) })
        expect(PluginMgr.definitions).toEqual({})
        expect(PluginMgr.providers).toEqual({})
      })

      test('plugin with defines', async () => {
        // Declaration
        const data = {
          name: 'pluginName',
          url: 'pluginUrl',
          dependencies: ['url2'],
          defines: {
            define1: {}
          }
        }
        const dataDependency = {
          name: 'dependencyName',
          url: 'dependencyUrl'
        }
        mockPluginLoaderHasData.mockImplementation(() => false)
        mockPluginLoaderLoad.mockImplementation(() => true)
        mockPluginLoaderIsLoaded.mockImplementation(() => true)
        mockPluginLoaderGetErrors.mockImplementation(() => [])
        mockPluginLoaderGetData.mockImplementation((url) => {
          if (url === 'url') {
            return data
          }
          return dataDependency
        })
        // Execution
        await PluginMgr.loadPlugin('url')
        // Assertion
        const expectedDefine = new PluginDefine(
          'pluginName',
          'define1',
          data.defines.define1
        )
        expect(PluginMgr.definitions).toEqual({
          'pluginName/define1': expectedDefine
        })
        expect(PluginMgr.getDefinition('pluginName/define1')).toEqual(expectedDefine)
      })

      test('plugin with provides', async () => {
        // Declaration
        const data = {
          name: 'pluginName',
          url: 'pluginUrl',
          defines: {
            define1: {}
          }
        }
        const dataChild = {
          name: 'childName',
          url: 'childUrl',
          provides: {
            'pluginName/define1': {
              'child': {}
            }
          }
        }
        mockPluginLoaderHasData.mockImplementation(() => false)
        mockPluginLoaderLoad.mockImplementation(() => true)
        mockPluginLoaderGetErrors.mockImplementation(() => [])
        // Execution
        mockPluginLoaderGetData.mockImplementation(() => data)
        await PluginMgr.loadPlugin('url')
        mockPluginLoaderGetData.mockImplementation(() => dataChild)
        await PluginMgr.loadPlugin('urlChild')
        // Assertion
        const expectedDefine = new PluginDefine(
          'pluginName',
          'define1',
          data.defines.define1
        )
        const expectedProvide = new PluginProvide(
          'childName',
          'pluginName/define1',
          '',
          dataChild.provides['pluginName/define1'].child
        )
        const expectedProvider = new PluginProvider(
          'childName',
          expectedDefine,
          expectedProvide
        )
        expect(PluginMgr.providers).toEqual({
          'pluginName/define1/child': expectedProvider
        })
        expect(PluginMgr.getProviders('pluginName/define1')).toEqual([expectedProvider])
        expect(PluginMgr.getProvider('pluginName/define1/child')).toEqual(expectedProvider)
      })

      test('when there is a retry', async () => {
        // Declaration
        const data = {
          name: 'pluginName',
          url: 'pluginUrl'
        }
        PluginMgr.retryDelay = 1000
        mockPluginLoaderHasData.mockImplementation(() => false)
        mockPluginLoaderLoad.mockImplementation(() => true)
        mockPluginLoaderGetErrors.mockImplementation(() => [])
        mockPluginLoaderGetData.mockImplementation(() => data)
        // Execution
        await PluginMgr.loadPlugin('url')
        await new Promise(resolve => setTimeout(resolve, 1500))
        // Assertion
      })

      test('load plugin with undefined provide', async () => {
        // Declaration
        const data = {
          name: 'pluginName',
          url: 'pluginUrl',
          provides: {
            define1: {
              name: 'test'
            }
          }
        }
        mockPluginLoaderHasData.mockImplementation(() => false)
        mockPluginLoaderLoad.mockImplementation(() => true)
        mockPluginLoaderGetErrors.mockImplementation(() => [])
        mockPluginLoaderGetData.mockImplementation(() => data)
        // Execution
        await PluginMgr.loadPlugin('url')
        // Assertion
        expect(PluginMgr.providers).toEqual({})
      })

      test('load plugin with dependency', async () => {
        // Declaration
        const data = {
          name: 'pluginName',
          url: 'pluginUrl',
          dependencies: ['depUrl']
        }
        const dataDependency = {
          name: 'dependencyName',
          url: 'dependencyUrl'
        }
        mockPluginLoaderHasData.mockImplementation(() => false)
        mockPluginLoaderLoad.mockImplementation(() => true)
        mockPluginLoaderGetErrors.mockImplementation(() => [])
        mockPluginLoaderGetData.mockImplementation((url) => {
          if (url === 'url') {
            return data
          }
          return dataDependency
        })
        // Execution
        await PluginMgr.loadPlugin('url')
        // Assertion
        expect(PluginMgr.plugins).toEqual({
          pluginName: {},
          dependencyName: {}
        })
      })
    })

    // reset //

    describe('reset', () => {

      test('properly cleans all internal data', async () => {
        // Declaration
        const url = 'url'
        const data = {
          name: 'pluginName',
          url: 'pluginUrl'
        }
        mockPluginLoaderHasData.mockImplementation(() => false)
        mockPluginLoaderLoad.mockImplementation(() => true)
        mockPluginLoaderGetErrors.mockImplementation(() => [])
        mockPluginLoaderGetData.mockImplementation(() => data)
        // Execution
        await PluginMgr.loadPlugin(url)
        PluginMgr.reset()
        // Assertion
        expect(PluginMgr.plugins).toEqual({})
        expect(PluginMgr.roots).toEqual({})
        expect(PluginMgr.definitions).toEqual({})
        expect(PluginMgr.providers).toEqual({})

        expect(PluginMgr.data).toEqual({
          urls: {},
          roots: {},
          plugins: {},
          definitions: {},
          providers: {}
        })
      })
    })

    describe('listeners', () => {

      test('Check that listeners are called', async () => {
        // Declaration
        const data = {
          name: 'pluginName',
          url: 'pluginUrl'
        }
        mockPluginLoaderHasData.mockImplementation(() => false)
        mockPluginLoaderLoad.mockImplementation(() => true)
        mockPluginLoaderGetErrors.mockImplementation(() => [])
        mockPluginLoaderGetData.mockImplementation(() => data)
        // Execution
        const spyListerner = jest.fn()
        PluginMgr.register(spyListerner)
        await PluginMgr.loadPlugin('url')
        // Assertion
        expect(spyListerner).toHaveBeenCalledTimes(1)
      })

      test('Check that listeners can be removed', async () => {
        // Declaration
        const data = {
          name: 'pluginName',
          url: 'pluginUrl'
        }
        mockPluginLoaderHasData.mockImplementation(() => false)
        mockPluginLoaderLoad.mockImplementation(() => true)
        mockPluginLoaderGetErrors.mockImplementation(() => [])
        mockPluginLoaderGetData.mockImplementation(() => data)
        // Execution
        const spyListerner = jest.fn()
        PluginMgr.register(spyListerner)
        PluginMgr.unregister(spyListerner)
        await PluginMgr.loadPlugin('url')
        // Assertion
        expect(spyListerner).toHaveBeenCalledTimes(0)
      })
    })
  })
})
