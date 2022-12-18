import {
  Plugin,
  PluginDefine,
  PluginDefineAttributes,
  PluginDefines,
  PluginProvide,
  PluginProvideAttributes,
  PluginProvides,
  PluginProvideElements
} from '../../../src/lib/plugin/PluginDefinitionModel'
import PluginManager, { PluginProvider, helpers } from '../../../src/lib/plugin/PluginManager'
import { LogConfig } from '@uncover/js-utils-logger'

LogConfig.off()

describe('PluginManager', () => {

  /* TEST DATA */


  /* TEST SETUP */

  let spyHelpersFetchPlugin: any
  let spyHelpersCheckPlugin: any
  let spyHelpersLoadPluginDefines: any
  let spyHelpersLoadPluginDefine: any
  let spyHelpersLoadPluginDefineAttributes: any
  let spyHelpersLoadPluginProvides: any
  let spyHelpersLoadPluginProvide: any
  let spyHelpersLoadPluginProvideAttributes: any
  let spyHelpersLoadPluginProvideElements: any
  let spyHelpersLoadPluginDependencies: any
  let spyHelpersLoadPluginInternal: any

  beforeEach(() => {
  })

  afterEach(() => {
    jest.restoreAllMocks()
    helpers.reset()
  })


  /* TEST CASES */

  // helpers.fetchPlugin //

  describe('helpers.fetchPlugin', () => {

    test('When fetch is correct', async () => {
      // Declaration
      const url = 'url'
      const data = {}
      // @ts-ignore
      global.fetch = jest.fn((input: URL) => Promise.resolve({
        json: () => Promise.resolve(data)
      }))
      // Execution
      const result = await helpers.fetchPlugin(url)
      // Assertion
      expect(result).toEqual(data)
    })

    test('When fetch throws', async () => {
      // Declaration
      const url = 'url'
      // @ts-ignore
      global.fetch = jest.fn(() => Promise.reject())
      // Execution
      await expect(helpers.fetchPlugin(url))
        .rejects
        .toThrow()
    })
  })

  // helpers.checkPlugin //

  describe('helpers.checkPlugin', () => {

    test('When plugin is not defined', () => {
      // Declaration
      const plugins: Plugin[] = []
      // Execution
      // Assertion
      expect(() => helpers.checkPlugin(plugins[0])).toThrow()
    })

    test('When plugin has no name', () => {
      // Declaration
      const plugin: Plugin = {
        name: '',
        url: 'url'
      }
      // Execution
      // Assertion
      expect(() => helpers.checkPlugin(plugin)).toThrow()
    })

    test('When plugin has no url', () => {
      // Declaration
      const plugin: Plugin = {
        name: 'name',
        url: ''
      }
      // Execution
      // Assertion
      expect(() => helpers.checkPlugin(plugin)).toThrow()
    })

    test('When plugin is empty', () => {
      // Declaration
      const plugin: Plugin = {
        name: 'name',
        url: 'url'
      }
      // Execution
      helpers.checkPlugin(plugin)
      // Assertion
      expect(plugin.dependencies).toEqual([])
      expect(plugin.defines).toEqual({})
      expect(plugin.provides).toEqual({})
    })

    test('When plugin contains all information', () => {
      // Declaration
      const pluginDependencies: string[] = []
      const pluginDefines: PluginDefines = {}
      const pluginProvides: PluginProvides = {}
      const plugin: Plugin = {
        name: 'name',
        url: 'url',
        dependencies: pluginDependencies,
        defines: pluginDefines,
        provides: pluginProvides
      }
      // Execution
      helpers.checkPlugin(plugin)
      // Assertion
      expect(plugin.dependencies).toBe(pluginDependencies)
      expect(plugin.defines).toBe(pluginDefines)
      expect(plugin.provides).toBe(pluginProvides)
    })
  })

  // helpers.loadPluginDefines //

  describe('helpers.loadPluginDefines', () => {

    beforeEach(() => {
      spyHelpersLoadPluginDefine = jest.spyOn(helpers, 'loadPluginDefine')
    })

    test('When there are no defines', () => {
      // Declaration
      const plugin: Plugin = {
        name: 'name',
        url: 'url',
        defines: {}
      }
      // Execution
      helpers.loadPluginDefines(plugin)
      // Assertion
      expect(PluginManager.definitions).toEqual({})
    })

    test('When there are compatible defines', () => {
      // Declaration
      const plugin: Plugin = {
        name: 'name',
        url: 'url',
        defines: {
          define1: {
            properties: {},
            attributes: {},
            elements: {},
          },
          define2: {
            properties: {},
            attributes: {},
            elements: {},
          }
        }
      }
      // Execution
      helpers.loadPluginDefines(plugin)
      // Assertion
      expect(spyHelpersLoadPluginDefine).toHaveBeenCalledTimes(2)
      expect(spyHelpersLoadPluginDefine).toHaveBeenCalledWith(plugin, 'define1')
      expect(spyHelpersLoadPluginDefine).toHaveBeenCalledWith(plugin, 'define2')
    })

    test('When there are incompatible defines', () => {
      // Declaration
      const plugin: Plugin = {
        name: 'name',
        url: 'url',
        defines: {
          define: {
            properties: {},
            attributes: {},
            elements: {},
          }
        }
      }
      // Execution
      helpers.loadPluginDefines(plugin)
      helpers.loadPluginDefines(plugin)
      // Assertion
      expect(spyHelpersLoadPluginDefine).toHaveBeenCalledTimes(1)
      expect(spyHelpersLoadPluginDefine).toHaveBeenCalledWith(plugin, 'define')
    })
  })

  // loadPluginDefine //

  describe('loadPluginDefine', () => {

    beforeEach(() => {
      spyHelpersLoadPluginDefineAttributes = jest.spyOn(helpers, 'loadPluginDefineAttributes')
    })

    test('Properly loads the plugin define', () => {
      // Declaration
      const plugin: Plugin = {
        name: 'name',
        url: 'url',
        defines: {
          define: {
            properties: {},
            attributes: {},
            elements: {},
          }
        }
      }
      // Execution
      helpers.loadPluginDefine(plugin, 'define')
      // Assertion
      expect(spyHelpersLoadPluginDefineAttributes).toHaveBeenCalledTimes(1)
      expect(spyHelpersLoadPluginDefineAttributes).toHaveBeenCalledWith(plugin.defines!.define.attributes)
      expect(PluginManager.definitions['name/define']).toBeDefined()
    })
  })

  // loadPluginDefineAttributes //

  describe('loadPluginDefineAttributes', () => {

    test('When there are no attributes', () => {
      // Declaration
      const attributes = {}
      // Execution
      const result = helpers.loadPluginDefineAttributes(attributes)
      // Assertion
      const expected = {}
      expect(result).toEqual(expected)
    })

    test('When there is one basic attribute', () => {
      // Declaration
      const attributes = {
        attribute: 'type'
      }
      // Execution
      const result = helpers.loadPluginDefineAttributes(attributes)
      // Assertion
      const expected = {
        attribute: {
          type: 'type',
          mandatory: true,
          array: false
        }
      }
      expect(result).toEqual(expected)
    })

    test('When there is one optionnal attribute', () => {
      // Declaration
      const attributes = {
        'attribute?': 'type'
      }
      // Execution
      const result = helpers.loadPluginDefineAttributes(attributes)
      // Assertion
      const expected = {
        attribute: {
          type: 'type',
          mandatory: false,
          array: false
        }
      }
      expect(result).toEqual(expected)
    })

    test('When there is one array attribute', () => {
      // Declaration
      const attributes = {
        attribute: 'type[]'
      }
      // Execution
      const result = helpers.loadPluginDefineAttributes(attributes)
      // Assertion
      const expected = {
        attribute: {
          type: 'type',
          mandatory: true,
          array: true
        }
      }
      expect(result).toEqual(expected)
    })
  })

  // loadPluginProvides //

  describe('loadPluginProvides', () => {

    beforeEach(() => {
      spyHelpersLoadPluginProvide = jest.spyOn(helpers, 'loadPluginProvide')
      spyHelpersLoadPluginProvide.mockImplementation(() => { })
    })

    test('When there are no provides', () => {
      // Declaration
      const plugin: Plugin = {
        name: 'name',
        url: 'url',
        defines: {
          define: {
            properties: {},
            attributes: {},
            elements: {},
          }
        },
        provides: {}
      }
      // Execution
      helpers.loadPluginProvides(plugin)
      // Assertion
      expect(spyHelpersLoadPluginProvide).toHaveBeenCalledTimes(0)
    })

    test('When there is an undefined provide', () => {
      // Declaration
      const plugin: Plugin = {
        name: 'name',
        url: 'url',
        defines: {
          define: {
            properties: {},
            attributes: {},
            elements: {},
          }
        },
        provides: {
          provide: {
            name: 'name',
            attributes: {},
            elements: {},
          }
        }
      }
      // Execution
      helpers.loadPluginProvides(plugin)
      // Assertion
      expect(spyHelpersLoadPluginProvide).toHaveBeenCalledTimes(0)
    })

    test('When there is a basic provide', () => {
      // Declaration
      const plugin: Plugin = {
        name: 'name',
        url: 'url',
        defines: {
          define: {
            properties: {},
            attributes: {},
            elements: {},
          }
        },
        provides: {
          'name/define': {
            name: 'name',
            attributes: {},
            elements: {},
          }
        }
      }
      PluginManager.definitions['name/define'] = {
        properties: {},
        attributes: {},
        elements: {},
      }
      // Execution
      helpers.loadPluginProvides(plugin)
      // Assertion
      expect(spyHelpersLoadPluginProvide).toHaveBeenCalledTimes(1)
      expect(spyHelpersLoadPluginProvide).toHaveBeenCalledWith(plugin, 'name/define', plugin.provides!['name/define'])
    })

    test('When there is an array of provide', () => {
      // Declaration
      const provide1 = {
        name: 'name1',
        attributes: {},
        elements: {},
      }
      const provide2 = {
        name: 'name2',
        attributes: {},
        elements: {},
      }
      const plugin: Plugin = {
        name: 'name',
        url: 'url',
        defines: {
          define: {
            properties: {},
            attributes: {},
            elements: {},
          }
        },
        provides: {
          'name/define': [provide1, provide2]
        }
      }
      PluginManager.definitions['name/define'] = {
        properties: {},
        attributes: {},
        elements: {},
      }
      // Execution
      helpers.loadPluginProvides(plugin)
      // Assertion
      expect(spyHelpersLoadPluginProvide).toHaveBeenCalledTimes(2)
      expect(spyHelpersLoadPluginProvide).toHaveBeenCalledWith(plugin, 'name/define', provide1)
      expect(spyHelpersLoadPluginProvide).toHaveBeenCalledWith(plugin, 'name/define', provide2)
    })
  })

  // loadPluginProvide //

  describe('loadPluginProvide', () => {

    beforeEach(() => {
      spyHelpersLoadPluginProvideAttributes = jest.spyOn(helpers, 'loadPluginProvideAttributes')
      spyHelpersLoadPluginProvideAttributes.mockImplementation(() => { })
      spyHelpersLoadPluginProvideElements = jest.spyOn(helpers, 'loadPluginProvideElements')
      spyHelpersLoadPluginProvideElements.mockImplementation(() => { })
    })

    test('Properly calls the loading methods', () => {
      // Declaration
      const provide = {
        name: 'name1',
        attributes: {},
        elements: {},
      }
      const plugin: Plugin = {
        name: 'name',
        url: 'url',
        defines: {},
        provides: {
          'name/define': provide
        }
      }
      // Execution
      helpers.loadPluginProvide(plugin, 'name/define', provide)
      // Assertion
      expect(spyHelpersLoadPluginProvideAttributes).toHaveBeenCalledTimes(1)
      expect(spyHelpersLoadPluginProvideAttributes).toHaveBeenCalledWith(plugin, 'name/define', provide.attributes)
      expect(spyHelpersLoadPluginProvideElements).toHaveBeenCalledTimes(1)
      expect(spyHelpersLoadPluginProvideElements).toHaveBeenCalledWith(plugin, 'name/define', provide.elements)
      expect(PluginManager.providers['name/define']).toBeDefined()
      expect(PluginManager.providers['name/define']).toHaveLength(1)
    })
  })

  // loadPluginProvideAttributes //

  describe('loadPluginProvideAttributes', () => {

    test('When there are no attributes', () => {
      // Declaration
      PluginManager.definitions['pluginName/pluginDefine'] = {
        attributes: {},
        elements: {},
        properties: {}
      }
      const provide = {
        name: 'provideName',
        attributes: {},
        elements: {},
      }
      const plugin: Plugin = {
        name: 'pluginName',
        url: 'pluginUrl',
        defines: {},
        provides: {
          'pluginName/pluginDefine': provide
        }
      }
      // Execution
      const result = helpers.loadPluginProvideAttributes(plugin, 'pluginName/pluginDefine', provide.attributes)
      // Assertion
      expect(result).toEqual({})
    })

    test('When there is one basic attribute', () => {
      // Declaration
      PluginManager.definitions['pluginName/pluginDefine'] = {
        attributes: {
          attribute: {
            type: 'string',
            mandatory: true,
            array: false
          }
        },
        elements: {},
        properties: {}
      }
      const provide = {
        name: 'provideName',
        attributes: {
          attribute: 'value'
        },
        elements: {},
      }
      const plugin: Plugin = {
        name: 'pluginName',
        url: 'pluginUrl',
        defines: {},
        provides: {
          'pluginName/pluginDefine': provide
        }
      }
      // Execution
      const result = helpers.loadPluginProvideAttributes(plugin, 'pluginName/pluginDefine', provide.attributes)
      // Assertion
      expect(result).toEqual({ attribute: 'value' })
    })

    test('When there is one url attribute', () => {
      // Declaration
      PluginManager.definitions['pluginName/pluginDefine'] = {
        attributes: {
          attribute: {
            type: 'url',
            mandatory: true,
            array: false
          }
        },
        elements: {},
        properties: {}
      }
      const provide = {
        name: 'provideName',
        attributes: {
          attribute: '/value'
        },
        elements: {},
      }
      const plugin: Plugin = {
        name: 'pluginName',
        url: 'pluginUrl',
        defines: {},
        provides: {
          'pluginName/pluginDefine': provide
        }
      }
      // Execution
      const result = helpers.loadPluginProvideAttributes(plugin, 'pluginName/pluginDefine', provide.attributes)
      // Assertion
      expect(result).toEqual({ attribute: 'pluginUrl/value' })
    })

    test('When there is an array of url attribute', () => {
      // Declaration
      PluginManager.definitions['pluginName/pluginDefine'] = {
        attributes: {
          attribute: {
            type: 'url',
            mandatory: true,
            array: true
          }
        },
        elements: {},
        properties: {}
      }
      const provide = {
        name: 'provideName',
        attributes: {
          attribute: ['/value1', '/value2']
        },
        elements: {},
      }
      const plugin: Plugin = {
        name: 'pluginName',
        url: 'pluginUrl',
        defines: {},
        provides: {
          'pluginName/pluginDefine': provide
        }
      }
      // Execution
      const result = helpers.loadPluginProvideAttributes(plugin, 'pluginName/pluginDefine', provide.attributes)
      // Assertion
      expect(result).toEqual({ attribute: ['pluginUrl/value1', 'pluginUrl/value2'] })
    })
  })

  // loadPluginProvideElements //

  describe('loadPluginProvideElements', () => {

    test('Properly loads the plugin elements', () => {
      // Declaration
      const plugin: Plugin = {
        name: 'pluginName',
        url: 'pluginUrl',
        defines: {},
        provides: {}
      }
      const provideId = 'provideId'
      const elements: PluginProvideElements = {
        element1: { url: 'elementUrl1', type: 'iframe' },
        element2: { url: 'elementUrl2', type: 'iframe' },
      }
      // Execution
      const result = helpers.loadPluginProvideElements(plugin, provideId, elements)
      // Assertion
      expect(result).toEqual(elements)
    })
  })

  // loadPluginDependencies //

  describe('loadPluginDependencies', () => {

    beforeEach(() => {
      spyHelpersLoadPluginInternal = jest.spyOn(helpers, 'loadPluginInternal')
      spyHelpersLoadPluginInternal.mockImplementation(() => 'internal')
    })

    test('Properly call the loader on dependencies', () => {
      // Declaration
      const plugin: Plugin = {
        name: 'pluginName',
        url: 'pluginUrl',
        dependencies: [
          'plugin1',
          'plugin2'
        ],
        defines: {},
        provides: {}
      }
      // Execution
      const result = helpers.loadPluginDependencies(plugin)
      // Assertion
      expect(spyHelpersLoadPluginInternal).toHaveBeenCalledTimes(2)
      expect(spyHelpersLoadPluginInternal).toHaveBeenCalledWith('plugin1', false)
      expect(spyHelpersLoadPluginInternal).toHaveBeenCalledWith('plugin2', false)
      expect(result).toEqual(['internal', 'internal'])
    })
  })

  // loadPluginInternal //

  describe('loadPluginInternal', () => {

    beforeEach(() => {
      spyHelpersFetchPlugin = jest.spyOn(helpers, 'fetchPlugin')
      spyHelpersCheckPlugin = jest.spyOn(helpers, 'checkPlugin')
      spyHelpersLoadPluginDefines = jest.spyOn(helpers, 'loadPluginDefines')
      spyHelpersLoadPluginProvides = jest.spyOn(helpers, 'loadPluginProvides')
      spyHelpersLoadPluginDependencies = jest.spyOn(helpers, 'loadPluginDependencies')
    })

    test('When the plugin is not valid', async () => {
      // Declaration
      const url = 'url'
      const plugin: Plugin = {
        name: 'pluginName',
        url: 'pluginUrl'
      }
      spyHelpersFetchPlugin.mockImplementation(() => plugin)
      spyHelpersCheckPlugin.mockImplementation(() => { throw new Error() })
      // Execution
      await helpers.loadPluginInternal(url, true)
      // Assertion
      expect(spyHelpersFetchPlugin).toHaveBeenCalledTimes(1)
      expect(spyHelpersFetchPlugin).toHaveBeenCalledWith(url)
      expect(spyHelpersCheckPlugin).toHaveBeenCalledTimes(1)
      expect(spyHelpersCheckPlugin).toHaveBeenCalledWith(plugin)
      expect(spyHelpersLoadPluginDefines).toHaveBeenCalledTimes(0)
      expect(spyHelpersLoadPluginProvides).toHaveBeenCalledTimes(0)
      expect(spyHelpersLoadPluginDependencies).toHaveBeenCalledTimes(0)
    })

    test('When the plugin is already defined', async () => {
      // Declaration
      const url = 'url'
      const plugin: Plugin = {
        name: 'pluginName',
        url: 'pluginUrl'
      }
      PluginManager.plugins['pluginName'] = {
        name: 'pluginName1',
        url: 'pluginUrl1'
      }
      spyHelpersFetchPlugin.mockImplementation(() => plugin)
      spyHelpersCheckPlugin.mockImplementation(() => { })
      // Execution
      await helpers.loadPluginInternal(url, true)
      // Assertion
      expect(spyHelpersFetchPlugin).toHaveBeenCalledTimes(1)
      expect(spyHelpersFetchPlugin).toHaveBeenCalledWith(url)
      expect(spyHelpersLoadPluginDefines).toHaveBeenCalledTimes(0)
      expect(spyHelpersLoadPluginProvides).toHaveBeenCalledTimes(0)
      expect(spyHelpersLoadPluginDependencies).toHaveBeenCalledTimes(0)
    })

    test('When the plugin is valid', async () => {
      // Declaration
      const url = 'url'
      const plugin: Plugin = {
        name: 'pluginName',
        url: 'pluginUrl'
      }
      spyHelpersFetchPlugin.mockImplementation(() => plugin)
      spyHelpersCheckPlugin.mockImplementation(() => { })
      spyHelpersLoadPluginDefines.mockImplementation(() => { })
      spyHelpersLoadPluginProvides.mockImplementation(() => { })
      spyHelpersLoadPluginDependencies.mockImplementation(() => { })
      // Execution
      await helpers.loadPluginInternal(url, true)
      // Assertion
      expect(spyHelpersFetchPlugin).toHaveBeenCalledTimes(1)
      expect(spyHelpersFetchPlugin).toHaveBeenCalledWith(url)
      expect(spyHelpersLoadPluginDefines).toHaveBeenCalledTimes(1)
      expect(spyHelpersLoadPluginDefines).toHaveBeenCalledWith(plugin)
      expect(spyHelpersLoadPluginProvides).toHaveBeenCalledTimes(1)
      expect(spyHelpersLoadPluginProvides).toHaveBeenCalledWith(plugin)
      expect(spyHelpersLoadPluginDependencies).toHaveBeenCalledTimes(1)
      expect(spyHelpersLoadPluginDependencies).toHaveBeenCalledWith(plugin)
    })
  })


  // PluginManager.loadPlugin //

  describe('PluginManager.loadPlugin', () => {

    beforeEach(() => {
      spyHelpersLoadPluginInternal = jest.spyOn(helpers, 'loadPluginInternal')
      spyHelpersLoadPluginInternal.mockImplementation(() => { })
    })

    test('Properly calls the internal loading method', () => {
      // Declaration
      const url = 'url'
      // Execution
      PluginManager.loadPlugin(url)
      // Assertion
      expect(spyHelpersLoadPluginInternal).toHaveBeenCalledTimes(1)
      expect(spyHelpersLoadPluginInternal).toHaveBeenCalledWith(url, true)
    })
  })

  // PluginManager.getProvider //

  describe('PluginManager.getProvider', () => {
    test('1', () => {
      // Declaration
      const provider: PluginProvider = {
        plugin: 'plugin',
        name: 'name',
        attributes: {},
        elements: {},
      }
      PluginManager.providers['provider'] = [provider]
      // Execution
      const result = PluginManager.getProviders('provider')
      // Assertion
      expect(result).toEqual([provider])
    })
  })
})
