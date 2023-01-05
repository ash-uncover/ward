import { PluginData, PluginDataDefineElement } from '../../../../src/lib/plugin/model/PluginDataModel'
import Plugin from '../../../../src/lib/plugin/object/Plugin'
import PluginDefine from '../../../../src/lib/plugin/object/PluginDefine'
import PluginProvide from '../../../../src/lib/plugin/object/PluginProvide'

describe('Plugin', () => {

  describe('constructor', () => {

    test('basic plugin definition', () => {
      // Declaration
      const data: PluginData = {
        name: 'name',
        url: 'url'
      }
      const loadedFrom = 'loadedFrom'
      // Execution
      const result = new Plugin(data, loadedFrom)
      // Assertion
      expect(result.loadedFrom).toEqual('loadedFrom')
      expect(result.name).toEqual('name')
      expect(result.url).toEqual('url')
      expect(result.dependencies).toEqual([])
      expect(result.defines).toEqual([])
      expect(result.provides).toEqual([])
    })

    test('with dependencies', () => {
      // Declaration
      const data: PluginData = {
        name: 'name',
        url: 'url',
        dependencies: ['dep1']
      }
      // Execution
      const result = new Plugin(data)
      // Assertion
      expect(result.dependencies).toEqual(['dep1'])
    })

    test('with defines', () => {
      // Declaration
      const data: PluginData = {
        name: 'name',
        url: 'url',
        defines: {
          define: {

          }
        }
      }
      // Execution
      const result = new Plugin(data)
      // Assertion
      const expectedDefine = new PluginDefine(
        'name',
        'define',
        {}
      )
      expect(result.defines).toEqual([expectedDefine])
    })

    test('with provides', () => {
      // Declaration
      const data: PluginData = {
        name: 'name',
        url: 'url',
        provides: {
          provide: {
            name: 'provideName'
          }
        }
      }
      // Execution
      const result = new Plugin(data)
      // Assertion
      const expectedProvide = new PluginProvide(
        'name',
        'provide',
        {
          name: 'provideName'
        }
      )
      expect(result.provides).toEqual([expectedProvide])
    })

    test('with provides array', () => {
      // Declaration
      const data: PluginData = {
        name: 'name',
        url: 'url',
        provides: {
          provide: [
            { name: 'provideName1' },
            { name: 'provideName2' },
          ]
        }
      }
      // Execution
      const result = new Plugin(data)
      // Assertion
      const expectedProvide1 = new PluginProvide(
        'name',
        'provide',
        {
          name: 'provideName1'
        }
      )
      const expectedProvide2 = new PluginProvide(
        'name',
        'provide',
        {
          name: 'provideName2'
        }
      )
      expect(result.provides).toEqual([expectedProvide1, expectedProvide2])
    })
  })
})