import PluginManager, { helpers } from '../../../src/lib/plugin/PluginManager'
import { LogConfig } from '@uncover/js-utils-logger'
import Plugin from '../../../src/lib/plugin/object/Plugin'
import PluginDefine from '../../../src/lib/plugin/object/PluginDefine'
import PluginProvider from '../../../src/lib/plugin/object/PluginProvider'
import PluginProvide from '../../../src/lib/plugin/object/PluginProvide'

LogConfig.off()

describe('PluginManager', () => {

  let spyHelpersFetchPlugin: any

  afterEach(() => {
    jest.restoreAllMocks()
  })

  describe('loadPlugin', () => {

    beforeEach(() => {
      spyHelpersFetchPlugin = jest.spyOn(helpers, 'fetchPlugin')
    })

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
            name: 'default',
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
      spyHelpersFetchPlugin.mockImplementation(() => data)
      // Execution
      await PluginManager.loadPlugin(`${data.url}/plugin.json`)
      // Assertion
      expect(PluginManager.datas).toEqual({ [`${data.url}/plugin.json`]: data })

      const plugin = PluginManager.getPlugin('test')
      expect(plugin).toBeDefined()

      const define = PluginManager.getDefinition('test/example')
      expect(define).toBeDefined()

      const provider = PluginManager.getProvider('test/example/default')
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