import { WardPlugin } from '../../../../src/plugin/loader/model/PluginDataModel'
import Plugin from '../../../../src/plugin/object/Plugin'
import PluginDefine from '../../../../src/plugin/object/PluginDefine'
import PluginProvide from '../../../../src/plugin/object/PluginProvide'

describe('Plugin', () => {

  afterEach(() => {
    jest.restoreAllMocks()
  })

  describe('constructor', () => {

    beforeEach(() => {
    })

    test('basic plugin definition', () => {
      // Declaration
      const data: WardPlugin = {
        name: 'name',
        url: 'url'
      }
      const loadUrl = 'loadUrl'
      // Execution
      const result = new Plugin(loadUrl, data)
      // Assertion
      expect(result.loadUrl).toEqual('loadUrl')
      expect(result.name).toEqual('name')
      expect(result.url).toEqual('url')
      expect(result.dependencies).toEqual([])
      expect(result.defines).toEqual([])
      expect(result.provides).toEqual([])
    })

    test('with dependencies', () => {
      // Declaration
      const data: WardPlugin = {
        name: 'name',
        url: 'url',
        dependencies: ['dep1']
      }
      const loadUrl = 'loadUrl'
      // Execution
      const result = new Plugin(loadUrl, data)
      // Assertion
      expect(result.dependencies).toEqual(data.dependencies)
    })

    test('with defines', () => {
      // Declaration
      const data: WardPlugin = {
        name: 'name',
        url: 'url',
        defines: {
          define: {

          }
        }
      }
      const loadUrl = 'loadUrl'
      // Execution
      const result = new Plugin(loadUrl, data)
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
      const data: WardPlugin = {
        name: 'name',
        url: 'url',
        provides: {
          provide: {
            provideName: {}
          }
        }
      }
      const loadUrl = 'loadUrl'
      // Execution
      const result = new Plugin(loadUrl, data)
      // Assertion
      const expectedProvide = new PluginProvide(
        'name',
        'provide',
        'provideName',
        {}
      )
      expect(result.provides).toEqual([expectedProvide])
    })

    test('with provides array', () => {
      // Declaration
      const data: WardPlugin = {
        name: 'name',
        url: 'url',
        provides: {
          provide: {
            provideName1: {},
            provideName2: {},
          }
        }
      }
      const loadUrl = 'loadUrl'
      // Execution
      const result = new Plugin(loadUrl, data)
      // Assertion
      const expectedProvide1 = new PluginProvide(
        'name',
        'provide',
        'provideName',
        {}
      )
      const expectedProvide2 = new PluginProvide(
        'name',
        'provide',
        'provideName',
        {}
      )
      expect(result.provides).toEqual([expectedProvide1, expectedProvide2])
    })
  })
})