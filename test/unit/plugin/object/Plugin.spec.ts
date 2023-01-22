import PluginManager from '../../../../src/lib/plugin/PluginManager'
import { WardPlugin } from '../../../../src/lib/plugin/loader/model/PluginDataModel'
import Plugin from '../../../../src/lib/plugin/object/Plugin'
import PluginDefine from '../../../../src/lib/plugin/object/PluginDefine'
import PluginProvide from '../../../../src/lib/plugin/object/PluginProvide'

describe('Plugin', () => {

  afterEach(() => {
    jest.restoreAllMocks()
  })

  describe('constructor', () => {

    let spyPluginManagerGetData: any
    let spyPluginManagerGetPlugin: any

    beforeEach(() => {
      spyPluginManagerGetData = jest.spyOn(PluginManager, 'getData')
      spyPluginManagerGetPlugin = jest.spyOn(PluginManager, 'getPlugin')
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
      const resultData = { name: 'depName' }
      const resultPlugin = { data: 'value' }
      spyPluginManagerGetData.mockImplementation(() => resultData)
      spyPluginManagerGetPlugin.mockImplementation(() => resultPlugin)
      // Execution
      const result = new Plugin(loadUrl, data)
      // Assertion
      const expected = [resultPlugin]
      expect(result.dependencies).toEqual(expected)
      expect(spyPluginManagerGetData).toHaveBeenCalledTimes(1)
      expect(spyPluginManagerGetPlugin).toHaveBeenCalledTimes(1)
    })

    test('with dependencies when dependency wasnt fetch yet', () => {
      // Declaration
      const data: WardPlugin = {
        name: 'name',
        url: 'url',
        dependencies: ['dep1']
      }
      const loadUrl = 'loadUrl'
      const resultData = { name: 'depName' }
      const resultPlugin = { data: 'value' }
      spyPluginManagerGetData.mockImplementation(() => null)
      spyPluginManagerGetPlugin.mockImplementation(() => resultPlugin)
      // Execution
      const result = new Plugin(loadUrl, data)
      // Assertion
      const expected: any[] = []
      expect(result.dependencies).toEqual(expected)
      expect(spyPluginManagerGetData).toHaveBeenCalledTimes(1)
      expect(spyPluginManagerGetPlugin).toHaveBeenCalledTimes(0)
    })

    test('with dependencies when the dependency is not loaded', () => {
      // Declaration
      const data: WardPlugin = {
        name: 'name',
        url: 'url',
        dependencies: ['dep1']
      }
      const loadUrl = 'loadUrl'
      const resultData = { name: 'depName' }
      const resultPlugin = { data: 'value' }
      spyPluginManagerGetData.mockImplementation(() => resultData)
      spyPluginManagerGetPlugin.mockImplementation(() => null)
      // Execution
      const result = new Plugin(loadUrl, data)
      // Assertion
      const expected: any[] = []
      expect(result.dependencies).toEqual(expected)
      expect(spyPluginManagerGetData).toHaveBeenCalledTimes(1)
      expect(spyPluginManagerGetPlugin).toHaveBeenCalledTimes(1)
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
        {
          name: 'provideName'
        }
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