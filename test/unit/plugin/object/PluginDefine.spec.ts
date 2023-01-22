import { WardPluginDefine } from '../../../../src/lib/plugin/loader/model/PluginDataModel'
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
      const data: WardPluginDefine = {}
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
      const data: WardPluginDefine = {
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
      expect(result.getProperty('prop1')).toEqual(expectedProperty)
    })

    test('when there are attributes', () => {
      // Declaration
      const plugin = 'plugin'
      const name = 'name'
      const data: WardPluginDefine = {
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
      expect(result.getAttribute('att1')).toEqual(expectedAttribute)
    })

    test('when there are elements', () => {
      // Declaration
      const plugin = 'plugin'
      const name = 'name'
      const data: WardPluginDefine = {
        elements: {
          elem1: {}
        }
      }
      // Execution
      const result = new PluginDefine(plugin, name, data)
      // Assertion
      const expectedElement = new PluginDefineElement(
        plugin,
        'elem1',
        {}
      )
      expect(result.elements).toEqual([expectedElement])
      expect(result.getElement('elem1')).toEqual(expectedElement)
    })
  })
})