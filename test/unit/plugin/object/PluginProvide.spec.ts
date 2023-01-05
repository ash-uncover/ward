import { PluginDataProvide } from '../../../../src/lib/plugin/model/PluginDataModel'
import PluginProvide from '../../../../src/lib/plugin/object/PluginProvide'

describe('PluginProvide', () => {

  describe('constructor', () => {

    test('when there are no attributes and no elements', () => {
      // Declaration
      const plugin = 'plugin'
      const define = 'define'
      const data: PluginDataProvide = {
        name: 'name'
      }
      // Execution
      const result = new PluginProvide(plugin, define, data)
      // Assertion
      expect(result.plugin).toEqual(plugin)
      expect(result.define).toEqual(define)
      expect(result.name).toEqual(data.name)
      expect(result.attributes).toEqual([])
      expect(result.elements).toEqual([])
    })
  })
})