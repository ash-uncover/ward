import { WardPluginProvide } from '../../../../src/lib/plugin/loader/model/PluginDataModel'
import PluginProvide from '../../../../src/lib/plugin/object/PluginProvide'

describe('PluginProvide', () => {

  describe('constructor', () => {

    test('when there are no attributes and no elements', () => {
      // Declaration
      const plugin = 'plugin'
      const defineName = 'defineName'
      const provideName = 'provideName'
      const data: WardPluginProvide = {}
      // Execution
      const result = new PluginProvide(plugin, defineName, provideName, data)
      // Assertion
      expect(result.plugin).toEqual(plugin)
      expect(result.define).toEqual(defineName)
      expect(result.name).toEqual(provideName)
      expect(result.attributes).toEqual([])
      expect(result.elements).toEqual([])
    })
  })
})