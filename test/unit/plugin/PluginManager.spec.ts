import {
  Plugin,
  PluginDefine,
  PluginDefineAttributes,
  PluginDefines,
  PluginProvide,
  PluginProvideAttributes,
  PluginProvides,
  PluginProvideViewers
} from '../../../src/lib/plugin/PluginDefinitionModel'
import PluginManager, {
  checkPlugin
} from '../../../src/lib/plugin/PluginManager'
import { LogConfig } from '@uncover/js-utils-logger'

LogConfig.off()

describe('PluginManager', () => {

  /* TEST DATA */


  /* TEST SETUP */

  beforeEach(() => {
  })

  afterEach(() => {
    jest.clearAllMocks()
  })


  /* TEST CASES */

  // fetchPlugin //

  describe('fetchPlugin', () => {
    test('1', () => {
      // Declaration
      // Execution
      // Assertion
    })
  })

  // checkPlugin //

  describe('checkPlugin', () => {
    test('When plugin is not defined', () => {
      // Declaration
      const plugins: Plugin[] = []
      // Execution
      // Assertion
      expect(() => checkPlugin(plugins[0])).toThrow()
    })

    test('When plugin has no name', () => {
      // Declaration
      const plugin: Plugin = {
        name: '',
        url: 'url'
      }
      // Execution
      // Assertion
      expect(() => checkPlugin(plugin)).toThrow()
    })

    test('When plugin has no url', () => {
      // Declaration
      const plugin: Plugin = {
        name: 'name',
        url: ''
      }
      // Execution
      // Assertion
      expect(() => checkPlugin(plugin)).toThrow()
    })

    test('When plugin is empty', () => {
      // Declaration
      const plugin: Plugin = {
        name: 'name',
        url: 'url'
      }
      // Execution
      checkPlugin(plugin)
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
      checkPlugin(plugin)
      // Assertion
      expect(plugin.dependencies).toBe(pluginDependencies)
      expect(plugin.defines).toBe(pluginDefines)
      expect(plugin.provides).toBe(pluginProvides)
    })
  })

  // loadPluginDefines //

  describe('loadPluginDefines', () => {
    test('1', () => {
      // Declaration
      // Execution
      // Assertion
    })
  })

  // loadPluginDefine //

  describe('loadPluginDefine', () => {
    test('1', () => {
      // Declaration
      // Execution
      // Assertion
    })
  })

  // loadPluginDefineAttributes //

  describe('loadPluginDefineAttributes', () => {
    test('1', () => {
      // Declaration
      // Execution
      // Assertion
    })
  })

  // loadPluginProvides //

  describe('loadPluginProvides', () => {
    test('1', () => {
      // Declaration
      // Execution
      // Assertion
    })
  })

  // loadPluginProvide //

  describe('loadPluginProvide', () => {
    test('1', () => {
      // Declaration
      // Execution
      // Assertion
    })
  })

  // loadPluginProvideAttributes //

  describe('loadPluginProvideAttributes', () => {
    test('1', () => {
      // Declaration
      // Execution
      // Assertion
    })
  })

  // loadPluginProvideViewers //

  describe('loadPluginProvideViewers', () => {
    test('1', () => {
      // Declaration
      // Execution
      // Assertion
    })
  })

  // loadPluginDependencies //

  describe('loadPluginDependencies', () => {
    test('1', () => {
      // Declaration
      // Execution
      // Assertion
    })
  })

  // loadPluginInternal //

  describe('loadPluginInternal', () => {
    test('1', () => {
      // Declaration
      // Execution
      // Assertion
    })
  })

  // PluginManager.plugins //

  describe('PluginManager.plugins', () => {
    test('1', () => {
      // Declaration
      // Execution
      // Assertion
    })
  })

  // PluginManager.loadPlugin //

  describe('PluginManager.loadPlugin', () => {
    test('1', () => {
      // Declaration
      // Execution
      // Assertion
    })
  })

  // PluginManager.definitions //

  describe('PluginManager.definitions', () => {
    test('1', () => {
      // Declaration
      // Execution
      // Assertion
    })
  })

  // PluginManager.providers //

  describe('PluginManager.providers', () => {
    test('1', () => {
      // Declaration
      // Execution
      // Assertion

    })
  })

  // PluginManager.loadPlugin //

  describe('PluginManager.loadPlugin', () => {
    test('1', () => {
      // Declaration
      // Execution
      // Assertion
    })
  })

  // PluginManager.getProvider //

  describe('PluginManager.getProvider', () => {
    test('1', () => {
      // Declaration
      // Execution
      // Assertion
    })
  })
})
