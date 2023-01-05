import PluginDefineAttribute from '../../../../src/lib/plugin/object/PluginDefineAttribute'
import PluginProvideAttribute from '../../../../src/lib/plugin/object/PluginProvideAttribute'
import PluginProviderAttribute from '../../../../src/lib/plugin/object/PluginProviderAttribute'

describe('PluginProviderAttribute', () => {

  describe('constructor', () => {

    test('when object is not an url', () => {
      // Declaration
      const pluginUrl = 'pluginUrl'
      const attributeDefinition = new PluginDefineAttribute(
        'attributeDefinitionPlugin',
        'attributeDefinitionName',
        'attributeDefinitionType'
      )
      const attribute = new PluginProvideAttribute(
        'attributePlugin',
        'attributeName',
        'attributeValue'
      )
      // Execution
      const result = new PluginProviderAttribute(pluginUrl, attributeDefinition, attribute)
      // Assertion
      expect(result.name).toEqual('attributeDefinitionName')
      expect(result.type).toEqual('attributeDefinitionType')
      expect(result.mandatory).toEqual(true)
      expect(result.array).toEqual(false)
      expect(result.value).toEqual('attributeValue')
    })

    test('when object is an url', () => {
      // Declaration
      const pluginUrl = 'pluginUrl'
      const attributeDefinition = new PluginDefineAttribute(
        'attributeDefinitionPlugin',
        'attributeDefinitionName',
        'url'
      )
      const attribute = new PluginProvideAttribute(
        'attributePlugin',
        'attributeName',
        'attributeValue'
      )
      // Execution
      const result = new PluginProviderAttribute(pluginUrl, attributeDefinition, attribute)
      // Assertion
      expect(result.name).toEqual('attributeDefinitionName')
      expect(result.type).toEqual('url')
      expect(result.mandatory).toEqual(true)
      expect(result.array).toEqual(false)
      expect(result.value).toEqual('pluginUrlattributeValue')
    })

    test('when object is an url array', () => {
      // Declaration
      const pluginUrl = 'pluginUrl'
      const attributeDefinition = new PluginDefineAttribute(
        'attributeDefinitionPlugin',
        'attributeDefinitionName',
        'url'
      )
      const attribute = new PluginProvideAttribute(
        'attributePlugin',
        'attributeName',
        ['attributeValue1', 'attributeValue2']
      )
      // Execution
      const result = new PluginProviderAttribute(pluginUrl, attributeDefinition, attribute)
      // Assertion
      expect(result.name).toEqual('attributeDefinitionName')
      expect(result.type).toEqual('url')
      expect(result.mandatory).toEqual(true)
      expect(result.array).toEqual(false)
      expect(result.value).toEqual(['pluginUrlattributeValue1', 'pluginUrlattributeValue2'])
    })
  })
})