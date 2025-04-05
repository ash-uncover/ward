import { GlobalConfig } from '@uncover/js-utils-logger'
import PluginManager from '../../../src/plugin/PluginManager'

GlobalConfig.off()

describe('PluginManager', () => {

  /* TEST DATA */

  let mockPluginLoaderReset = jest.fn()
  let mockPluginLoaderHasData = jest.fn()
  let mockPluginLoaderIsLoaded = jest.fn()
  let mockPluginLoaderGetData = jest.fn()
  let mockPluginLoaderGetErrors = jest.fn()
  let mockPluginLoaderGetState = jest.fn()
  let mockPluginLoaderLoad = jest.fn()
  let mockPluginLoaderExclude = jest.fn()
  let mockPluginLoaderInclude = jest.fn()

  let PluginMgr: PluginManager

  /* TEST SETUP */

  beforeEach(() => {
    jest.restoreAllMocks()
    const mockPluginLoader = {
      reset: mockPluginLoaderReset,
      urls: [],
      hasData: mockPluginLoaderHasData,
      isLoaded: mockPluginLoaderIsLoaded,
      getData: mockPluginLoaderGetData,
      getErrors: mockPluginLoaderGetErrors,
      getState: mockPluginLoaderGetState,
      load: mockPluginLoaderLoad,
      exclude: mockPluginLoaderExclude,
      include: mockPluginLoaderInclude
    }
    PluginMgr = new PluginManager(mockPluginLoader)
  })

  afterEach(() => {
    jest.restoreAllMocks()
  })

  /* TEST CASES */

  describe('loadPlugin', () => {

    test('', async () => {
      // Declaration
      const data = {
        name: 'test',
        url: 'http://test.com',
        dependencies: [],
        defines: {
          'example': {
            elements: {
              'my-element': {

              }
            }
          }
        },
        provides: {
          'test/example': {
            default: {
              elements: {
                'my-element': {
                  url: '/test.wc.js',
                  type: 'webcomponent',
                  element: 'test-element',
                }
              }
            }
          }
        }
      }
      mockPluginLoaderHasData.mockImplementation(() => false)
      mockPluginLoaderLoad.mockImplementation(() => true)
      mockPluginLoaderGetErrors.mockImplementation(() => [])
      mockPluginLoaderGetData.mockImplementation(() => data)
      // Execution
      await PluginMgr.loadPlugin(`${data.url}/plugin.json`)
      // Assertion
      const plugin = PluginMgr.getPlugin('test')
      expect(plugin).toBeDefined()

      const define = PluginMgr.getDefinition('test/example')
      expect(define).toBeDefined()

      const provider = PluginMgr.getProvider('test/example/default')
      expect(provider).toBeDefined()
      expect(provider.name).toBe('test/example/default')
      expect(provider.plugin).toBe('test')
      expect(provider.getAttributes()).toEqual([])
      expect(provider.getElements()).toHaveLength(1)

      const element = provider.getElement('my-element')!
      expect(element).toBeDefined()
      expect(element.url).toBe('http://test.com/test.wc.js')
      expect(element.type).toBe('webcomponent')
      expect(element.element).toBe('test-element')
    })

    test('load ward-demo plugin', async () => {
      // Declaration
      const data = {
        name: "ward-demo",
        description: "Ward Demo",
        url: "http://localhost:27000",
        dependencies: [
          "http://localhost:27001/plugin.json",
          "http://localhost:27002/plugin.json"
        ],
        defines: {
          viewers: {
            attributes: {
              id: "string",
              name: "string"
            },
            elements: {
              viewer: {}
            }
          }
        }
      }
      mockPluginLoaderHasData.mockImplementation(() => false)
      mockPluginLoaderLoad.mockImplementation(() => true)
      mockPluginLoaderGetErrors.mockImplementation(() => [])
      mockPluginLoaderGetData.mockImplementation((url) => {
        if (url === `${data.url}/plugin.json`) {
          return data
        }
        return {}
      })
      // Execution
      await PluginMgr.loadPlugin(`${data.url}/plugin.json`)
      // Assertion
      expect(mockPluginLoaderLoad).toHaveBeenCalledTimes(3)
      expect(mockPluginLoaderLoad).toHaveBeenCalledWith(`${data.url}/plugin.json`)
      expect(mockPluginLoaderLoad).toHaveBeenCalledWith(`http://localhost:27001/plugin.json`)
      expect(mockPluginLoaderLoad).toHaveBeenCalledWith(`http://localhost:27002/plugin.json`)
      const plugin = PluginMgr.getPlugin('ward-demo')
      expect(plugin).toBeDefined()
      expect(plugin!.dependencies).toHaveLength(2)

    })
  })
})