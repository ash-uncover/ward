import { WardPluginProvideElement } from '../../../../src/plugin/loader/model/PluginDataModel'
import PluginProvideElement from '../../../../src/plugin/object/PluginProvideElement'

describe('PluginProvideElement', () => {

  describe('constructor', () => {

    test('with iframe element', () => {
      // Declaration
      const plugin = 'plugin'
      const name = 'name'
      const data: WardPluginProvideElement = {
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

    test('with webcomponent element', () => {
      // Declaration
      const plugin = 'plugin'
      const name = 'name'
      const data: WardPluginProvideElement = {
        url: 'url',
        element: 'element',
        type: 'webcomponent'
      }
      // Execution
      const result = new PluginProvideElement(plugin, name, data)
      // Assertion
      expect(result.plugin).toEqual(plugin)
      expect(result.name).toEqual(name)
      expect(result.url).toEqual(data.url)
      expect(result.type).toEqual(data.type)
      expect(result.element).toEqual(data.element)
    })
  })
})