import React, { FormEvent, ReactNode, useEffect, useState } from 'react'
import { PluginManager} from '../../../../src'

import { PluginSideEntry } from './side/PluginSideEntry'
import { DefinitionSideEntry } from './side/DefinitionSideEntry'

import './App.css'

interface AppProperties {
  pluginId?: string
  children: ReactNode
}

const App = ({
  pluginId,
  children
}: AppProperties) => {

  // Hooks //

  const [newPluginUrl, setNewPluginUrl] = useState<string>(' ')

  const [plugin, setPlugin] = useState<string>('')

  useEffect(() => {
    console.log('1')
    setPlugin('http://localhost:27000/plugin.json')
  }, [])

  useEffect(() => {
    console.log('2 ' +plugin)
    if (plugin) {
      PluginManager.reset()
      PluginManager.loadPlugin(plugin).then(() => {
        console.log('3 ' + plugin)
        setNewPluginUrl('')
      })
    }
  }, [plugin])

  // Events //

  const handleNewPluginUrlChange = (event: FormEvent<HTMLInputElement>) => {
    setNewPluginUrl(event.currentTarget.value)
  }

  const handleSetPlugin = (event: FormEvent<HTMLButtonElement>) => {
    event.preventDefault()
    if (newPluginUrl && !Object.values(PluginManager.plugins).some(plugin => plugin.url === newPluginUrl)) {
      setPlugin(newPluginUrl)
    }
  }

  // Rendering //

  return (
    <div className='plugins'>

      <div className='plugins__side_panel'>

        <h2>
          Plugins
        </h2>

        <h3>
          Set plugin
        </h3>

        <form>
          <div>
            <input
              value={newPluginUrl}
              onChange={handleNewPluginUrlChange}
            />
          </div>
          <div>
            <button
              role='submit'
              onClick={handleSetPlugin}>
              Set
            </button>
          </div>
        </form>

        <h3>
          Plugin list
        </h3>

        <ul>
          {Object.values(PluginManager.rootPlugins).map(plugin => {
            return (
              <PluginSideEntry
                key={plugin.name}
                selectedPluginId={pluginId}
                pluginId={plugin.name}
              />
            )
          })}
        </ul>

        <h3>
          Definitions
        </h3>

        <ul>
          {Object.values(PluginManager.definitions).map(definition => {
            return (
              <DefinitionSideEntry
                key={definition.name}
                selectedPluginId={pluginId}
                definitionId={definition.name}
              />
            )
          })}
        </ul>

      </div>

      <div className='plugins__details'>
        {children}
      </div>

    </div>
  )
}

export default App