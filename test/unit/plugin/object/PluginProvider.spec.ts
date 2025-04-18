import PluginDefine from '../../../../src/plugin/object/PluginDefine'
import PluginProvide from '../../../../src/plugin/object/PluginProvide'
import PluginProvider from '../../../../src/plugin/object/PluginProvider'

describe('PluginProvider', () => {

  describe('constructor', () => {

    test('when there are no attributes and no elements', () => {
      // Declaration
      const pluginUrl = 'pluginUrl'
      const definition = new PluginDefine(
        'definitionPlugin',
        'definitionName',
        {}
      )
      const provide = new PluginProvide(
        'providePlugin',
        'provideDefine',
        'provideName',
        {}
      )
      // Execution
      const result = new PluginProvider(pluginUrl, definition, provide)
      // Assertion
      expect(result.plugin).toEqual('providePlugin')
      expect(result.definition).toEqual('definitionPlugin/definitionName')
      expect(result.name).toEqual('definitionPlugin/definitionName/provideName')
      expect(result.getAttributes()).toEqual([])
      expect(result.getElements()).toEqual([])
    })

    test('when there are valid attributes and valid elements', () => {
      // Declaration
      const pluginUrl = 'pluginUrl'
      const definition = new PluginDefine(
        'definitionPlugin',
        'definitionName',
        {
          attributes: {
            att1: 'string',
            'att2?': 'string'
          },
          elements: {
            element1: {}
          }
        }
      )
      const provide = new PluginProvide(
        'providePlugin',
        'provideDefine',
        'provideName',
        {
          attributes: {
            att1: 'value1'
          },
          elements: {
            element1: {
              url: 'element1Url',
              type: 'iframe'
            }
          }
        }
      )
      // Execution
      const result = new PluginProvider(pluginUrl, definition, provide)
      // Assertion
      expect(result.plugin).toEqual('providePlugin')
      expect(result.definition).toEqual('definitionPlugin/definitionName')
      expect(result.name).toEqual('definitionPlugin/definitionName/provideName')

      expect(result.getAttributes()).toHaveLength(1)
      expect(result.getAttribute('att1')).toBeDefined()
      expect(result.attributes.att1).toEqual('value1')

      expect(result.getElements()).toHaveLength(1)
      expect(result.getElement('element1')).toBeDefined()
      expect(result.elements.element1.url).toEqual('pluginUrlelement1Url')
      expect(result.elements.element1.type).toEqual('iframe')
    })

    test('when an attribute type does not match the definition', () => {
      // Declaration
      const pluginUrl = 'pluginUrl'
      const definition = new PluginDefine(
        'definitionPlugin',
        'definitionName',
        {
          attributes: {
            att1: 'string[]'
          },
          elements: {
            element1: {}
          }
        }
      )
      const provide = new PluginProvide(
        'providePlugin',
        'provideDefine',
        'provideName',
        {
          attributes: {
            att1: 'value1'
          },
          elements: {
            element1: {
              url: 'element1Url',
              type: 'iframe'
            }
          }
        }
      )
      // Execution
      // Assertion
      expect(() => new PluginProvider(pluginUrl, definition, provide)).toThrow()
    })

    test('when an attribute type does not match the definition #2', () => {
      // Declaration
      const pluginUrl = 'pluginUrl'
      const definition = new PluginDefine(
        'definitionPlugin',
        'definitionName',
        {
          attributes: {
            att1: 'string'
          },
          elements: {
            element1: {}
          }
        }
      )
      const provide = new PluginProvide(
        'providePlugin',
        'provideDefine',
        'provideName',
        {
          attributes: {
            att1: ['value1', 'value2']
          },
          elements: {
            element1: {
              url: 'element1Url',
              type: 'iframe'
            }
          }
        }
      )
      // Execution
      // Assertion
      expect(() => new PluginProvider(pluginUrl, definition, provide)).toThrow()
    })

    test('when a mandatory attribute is missing', () => {
      // Declaration
      const pluginUrl = 'pluginUrl'
      const definition = new PluginDefine(
        'definitionPlugin',
        'definitionName',
        {
          attributes: {
            att1: 'string'
          },
          elements: {
            element1: {}
          }
        }
      )
      const provide = new PluginProvide(
        'providePlugin',
        'provideDefine',
        'provideName',
        {
          attributes: {},
          elements: {
            element1: {
              url: 'element1Url',
              type: 'iframe'
            }
          }
        }
      )
      // Execution
      // Assertion
      expect(() => new PluginProvider(pluginUrl, definition, provide)).toThrow()
    })

    test('when an element is missing', () => {
      // Declaration
      const pluginUrl = 'pluginUrl'
      const definition = new PluginDefine(
        'definitionPlugin',
        'definitionName',
        {
          attributes: {
            att1: 'string'
          },
          elements: {
            element1: {}
          }
        }
      )
      const provide = new PluginProvide(
        'providePlugin',
        'provideDefine',
        'provideName',
        {
          attributes: {
            att1: 'value1'
          }
        }
      )
      // Execution
      // Assertion
      expect(() => new PluginProvider(pluginUrl, definition, provide)).toThrow()
    })
  })
})