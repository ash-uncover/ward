import PluginManager from '../../src/lib/plugin/PluginManager'
import PluginLoaderTest from '../PluginLoaderTest'

describe('Ward', () => {

  /* TEST DATA */

  /* TEST SETUP */

  /* TEST CASES */

  // constructor //

  describe('constructor', () => {

    test('when loading plugins', async () => {
      // Declaration
      const mgr = new PluginManager(new PluginLoaderTest())
      // Execution
      await mgr.loadPlugin('pluginMain')
      // Assertion
      expect(Object.keys(mgr.urls)).toEqual(['pluginMain', 'pluginSub1', 'pluginSub2'])
      expect(mgr.urls.pluginMain).toEqual({
        data: {
          defines: {
            defineMain: {
              attributes: {
                attributeMain: "string"
              },
              elements: {
                elementMain: {}
              }
            }
          },
          dependencies: ["pluginSub1", "pluginSub2"],
          name: "plugin-main",
          url: "./plugin-main"
        },
        errors: [],
        state: "LOADED"
      })
      expect(mgr.urls.pluginSub1).toEqual({
        data: {
          provides: {
            ['plugin-main/defineMain']: {
              sub1: {
                attributes: {
                  attributeMain: "sub1 att1"
                },
                elements: {
                  elementMain: {
                    url: '#',
                    type: 'iframe'
                  }
                }
              }
            }
          },
          dependencies: [],
          name: "plugin-sub-1",
          url: "./plugin-sub-1"
        },
        errors: [],
        state: "LOADED"
      })
      expect(mgr.urls.pluginSub2).toEqual({
        data: {
          provides: {
            ['plugin-main/defineMain']: {
              sub2: {
                attributes: {
                  attributeMain: "sub2 att2"
                },
                elements: {
                  elementMain: {
                    url: '#',
                    type: 'iframe'
                  }
                }
              }
            }
          },
          dependencies: [],
          name: "plugin-sub-2",
          url: "./plugin-sub-2"
        },
        errors: [],
        state: "LOADED"
      })
    })

    test('when disabling a loaded plugin', async () => {
      // Declaration
      const mgr = new PluginManager(new PluginLoaderTest())
      // Execution
      await mgr.loadPlugin('pluginMain')
      await mgr.unloadPlugin('pluginSub1')
      // Assertion
      expect(Object.keys(mgr.urls)).toEqual(['pluginMain', 'pluginSub1', 'pluginSub2'])
      expect(mgr.getState('pluginMain')).toEqual('LOADED')
      expect(mgr.getState('pluginSub1')).toEqual('EXCLUDED')
      expect(mgr.getState('pluginSub2')).toEqual('LOADED')
    })

    test('when disabling a root plugin', async () => {
      // Declaration
      const mgr = new PluginManager(new PluginLoaderTest())
      // Execution
      await mgr.loadPlugin('pluginMain')
      await mgr.unloadPlugin('pluginMain')
      // Assertion
      expect(Object.keys(mgr.urls)).toEqual(['pluginMain'])
      expect(mgr.getState('pluginMain')).toEqual('NONE')
    })
  })
})