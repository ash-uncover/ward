import { WardPluginProvide } from '../../../../src/plugin/loader/model/PluginDataModel'
import PluginProvide from '../../../../src/plugin/object/PluginProvide'
import PluginProvideAttribute from '../../../../src/plugin/object/PluginProvideAttribute'
import PluginProvideElement from '../../../../src/plugin/object/PluginProvideElement'

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

    test('with attributes and elements', () => {
      // Declaration
      const plugin = 'plugin'
      const defineName = 'defineName'
      const provideName = 'provideName'
      const data: WardPluginProvide = {
        attributes: {
          attribute: 'value'
        },
        elements: {
          element: {
            url: 'url',
            type: 'component'
          }
        }
      }
      // Execution
      const result = new PluginProvide(plugin, defineName, provideName, data)
      // Assertion
      expect(result.plugin).toEqual(plugin)
      expect(result.define).toEqual(defineName)
      expect(result.name).toEqual(provideName)
      expect(result.attributes).toEqual([
        new PluginProvideAttribute(plugin, 'attribute', 'value')
      ])
      expect(result.getAttribute('attribute')).toEqual(new PluginProvideAttribute(plugin, 'attribute', 'value'))
      expect(result.elements).toEqual([
        new PluginProvideElement(plugin, 'element', {
          url: 'url',
          type: 'component'
        })
      ])
      expect(result.getElement('element')).toEqual(new PluginProvideElement(plugin, 'element', {
        url: 'url',
        type: 'component'
      }));
    })
  })
})