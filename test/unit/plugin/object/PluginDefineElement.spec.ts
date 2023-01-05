import { PluginDataDefineElement } from '../../../../src/lib/plugin/model/PluginDataModel'
import PluginDefineElement from '../../../../src/lib/plugin/object/PluginDefineElement'

describe('PluginDefineElement', () => {

  describe('constructor', () => {

    test('when there are no attributes and no elements', () => {
      // Declaration
      const plugin = 'plugin'
      const name = 'name'
      const data: PluginDataDefineElement = {}
      // Execution
      const result = new PluginDefineElement(plugin, name, data)
      // Assertion
      expect(result.plugin).toEqual(plugin)
      expect(result.name).toEqual(name)
    })
  })
})