import { WardPluginDefineElement } from '../../../../src/lib/plugin/loader/model/PluginDataModel'
import PluginDefineElement from '../../../../src/lib/plugin/object/PluginDefineElement'
import PluginDefineElementAttribute from '../../../../src/lib/plugin/object/PluginDefineElementAttribute'
import PluginDefineElementEvent from '../../../../src/lib/plugin/object/PluginDefineElementEvent'
import PluginDefineElementProperty from '../../../../src/lib/plugin/object/PluginDefineElementProperty'

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