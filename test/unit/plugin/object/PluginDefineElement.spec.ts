import { WardPluginDefineElement } from '../../../../src/plugin/loader/model/PluginDataModel'
import PluginDefineElement from '../../../../src/plugin/object/PluginDefineElement'
import PluginDefineElementAttribute from '../../../../src/plugin/object/PluginDefineElementAttribute'
import PluginDefineElementEvent from '../../../../src/plugin/object/PluginDefineElementEvent'
import PluginDefineElementProperty from '../../../../src/plugin/object/PluginDefineElementProperty'

describe('PluginDefineElement', () => {

  describe('constructor', () => {

    test('when there are no attributes and no elements', () => {
      // Declaration
      const plugin = 'plugin'
      const name = 'name'
      const data: WardPluginDefineElement = {}
      // Execution
      const result = new PluginDefineElement(plugin, name, data)
      // Assertion
      expect(result.plugin).toEqual(plugin)
      expect(result.name).toEqual(name)
    })

    test('when there are no attributes and no elements', () => {
      // Declaration
      const plugin = 'plugin'
      const name = 'name'
      const data: WardPluginDefineElement = {
        attributes: {
          'attribute': 'string'
        },
        properties: {
          'property': 'number'
        },
        events: {
          'event': {}
        }
      }
      // Execution
      const result = new PluginDefineElement(plugin, name, data)
      // Assertion
      expect(result.plugin).toEqual(plugin)
      expect(result.name).toEqual(name)
      expect(result.attributes).toEqual([new PluginDefineElementAttribute('attribute', 'string')])
      expect(result.properties).toEqual([new PluginDefineElementProperty('property', 'number')])
      expect(result.events).toEqual([new PluginDefineElementEvent('event')])
    })
  })
})