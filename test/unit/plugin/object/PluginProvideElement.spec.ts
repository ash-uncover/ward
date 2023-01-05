import PluginProvideElement from '../../../../src/lib/plugin/object/PluginProvideElement'
import { PluginDataProvideElement } from '../../../../src/lib/plugin/model/PluginDataModel'

describe('PluginProvideElement', () => {

  describe('constructor', () => {

    test('properly fills the object', () => {
      // Declaration
      const plugin = 'plugin'
      const name = 'name'
      const data: PluginDataProvideElement = {
        url: 'url',
        type: 'iframe'
      }
      // Execution
      const result = new PluginProvideElement(plugin, name, data)
      // Assertion
      expect(result.plugin).toEqual(plugin)
      expect(result.name).toEqual(name)
      expect(result.url).toEqual(data.url)
      expect(result.type).toEqual(data.type)
    })
  })
})