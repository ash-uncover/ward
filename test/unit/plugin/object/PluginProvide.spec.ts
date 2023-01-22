import { WardPluginProvide } from '../../../../src/lib/plugin/loader/model/PluginDataModel'
import PluginProvide from '../../../../src/lib/plugin/object/PluginProvide'

describe('PluginProvide', () => {

  describe('constructor', () => {

    test('when there are no attributes and no elements', () => {
      // Declaration
      const plugin = 'plugin'
      const define = 'define'
      const data: WardPluginProvide = {}
      // Execution
      const result = new PluginProvide(plugin, define, data)
      // Assertion
      expect(result.plugin).toEqual(plugin)
      expect(result.define).toEqual(define)
      expect(result.attributes).toEqual([])
      expect(result.elements).toEqual([])
    })
  })
})