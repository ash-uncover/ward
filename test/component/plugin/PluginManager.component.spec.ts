import PluginManager from '../../../src/lib/plugin/PluginManager'
import { LogConfig } from '@uncover/js-utils-logger'
import PluginLoader from '../../../src/lib/plugin//loader/PluginLoader'


LogConfig.off()

describe('PluginManager', () => {

  /* TEST DATA */

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
    jest.restoreAllMocks()
    const mockPluginLoader = {
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
      expect(provider.attributes).toEqual({})
      expect(provider.elements['my-element']).toBeDefined()

      const element = provider.getElement('my-element')
      expect(element).toBeDefined()
      expect(element.url).toBe('http://test.com/test.wc.js')
      expect(element.type).toBe('webcomponent')
      expect(element.element).toBe('test-element')
    })
  })

})