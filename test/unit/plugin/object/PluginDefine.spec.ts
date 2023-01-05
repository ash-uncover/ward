import { PluginDataDefine } from '../../../../src/lib/plugin/model/PluginDataModel'
import PluginDefine from '../../../../src/lib/plugin/object/PluginDefine'
import PluginDefineAttribute from '../../../../src/lib/plugin/object/PluginDefineAttribute'
import PluginDefineElement from '../../../../src/lib/plugin/object/PluginDefineElement'
import PluginDefineProperty from '../../../../src/lib/plugin/object/PluginDefineProperty'

describe('PluginDefine', () => {

  describe('constructor', () => {

    test('when there are no properties, no attributes and no elements', () => {
      // Declaration
      const plugin = 'plugin'
      const name = 'name'
      const data: PluginDataDefine = {}
      // Execution
      const result = new PluginDefine(plugin, name, data)
      // Assertion
      expect(result.plugin).toEqual('plugin')
      expect(result.name).toEqual('plugin/name')
      expect(result.properties).toEqual([])
      expect(result.attributes).toEqual([])
      expect(result.elements).toEqual([])
    })

    test('when there are properties', () => {
      // Declaration
      const plugin = 'plugin'
      const name = 'name'
      const data: PluginDataDefine = {
        properties: {
          prop1: 'string'
        }
      }
      // Execution
      const result = new PluginDefine(plugin, name, data)
      // Assertion
      const expectedProperty = new PluginDefineProperty(
        plugin,
        'prop1',
        'string'
      )
      expect(result.properties).toEqual([expectedProperty])
    })

    test('when there are attributes', () => {
      // Declaration
      const plugin = 'plugin'
      const name = 'name'
      const data: PluginDataDefine = {
        attributes: {
          att1: 'string'
        }
      }
      // Execution
      const result = new PluginDefine(plugin, name, data)
      // Assertion
      const expectedAttribute = new PluginDefineAttribute(
        plugin,
        'att1',
        'string'
      )
      expect(result.attributes).toEqual([expectedAttribute])
    })

    test('when there are elements', () => {
      // Declaration
      const plugin = 'plugin'
      const name = 'name'
      const data: PluginDataDefine = {
        elements: {
          elem1: {}
        }
      }
      // Execution
      const result = new PluginDefine(plugin, name, data)
      // Assertion
      const expectedElement = new PluginDefineElement(
        plugin,
        'att1',
        {}
      )
      expect(result.elements).toEqual([expectedElement])
    })
  })
})