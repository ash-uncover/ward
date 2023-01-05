import PluginDefineElement from '../../../../src/lib/plugin/object/PluginDefineElement'
import PluginProvideElement from '../../../../src/lib/plugin/object/PluginProvideElement'
import PluginProviderElement from '../../../../src/lib/plugin/object/PluginProviderElement'

describe('PluginProviderElement', () => {

  describe('constructor', () => {

    test('properly fills the object', () => {
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
  })
})