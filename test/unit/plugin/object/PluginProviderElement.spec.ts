import PluginDefineElement from '../../../../src/plugin/object/PluginDefineElement'
import PluginProvideElement from '../../../../src/plugin/object/PluginProvideElement'
import PluginProviderElement from '../../../../src/plugin/object/PluginProviderElement'

describe('PluginProviderElement', () => {

  describe('constructor', () => {

    test('with iframe element', () => {
      // Declaration
      const pluginUrl = 'pluginUrl'
      const elementDefinition = new PluginDefineElement(
        'elementDefinitionPlugin',
        'elementDefinitionName',
        {}
      )
      const element = new PluginProvideElement(
        'elementPlugin',
        'elementName',
        {
          url: 'elementUrl',
          type: 'iframe'
        }
      )
      // Execution
      const result = new PluginProviderElement(pluginUrl, elementDefinition, element)
      // Assertion
      expect(result.name).toEqual('elementDefinitionName')
      expect(result.url).toEqual('pluginUrlelementUrl')
      expect(result.type).toEqual('iframe')
    })

    test('with webcomponent element', () => {
      // Declaration
      const pluginUrl = 'pluginUrl'
      const elementDefinition = new PluginDefineElement(
        'elementDefinitionPlugin',
        'elementDefinitionName',
        {}
      )
      const element = new PluginProvideElement(
        'elementPlugin',
        'elementName',
        {
          url: 'elementUrl',
          element: 'element',
          type: 'webcomponent'
        }
      )
      // Execution
      const result = new PluginProviderElement(pluginUrl, elementDefinition, element)
      // Assertion
      expect(result.name).toEqual('elementDefinitionName')
      expect(result.url).toEqual('pluginUrlelementUrl')
      expect(result.type).toEqual('webcomponent')
      expect(result.element).toEqual('element')
    })
  })
})