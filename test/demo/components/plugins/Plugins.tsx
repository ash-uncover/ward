import React, { FormEvent, ReactNode, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import PluginManager from '../../../../src/lib/plugin/PluginManager'

import './Plugins.css'
import { PluginSideEntry } from './side/PluginSideEntry'
import { DefinitionSideEntry } from './side/DefinitionSideEntry'

interface PluginsProperties {
  pluginId?: string
  children: ReactNode
}

const Plugins = ({
  pluginId,
  children
}: PluginsProperties) => {

  // Hooks //

  const [newPluginUrl, setNewPluginUrl] = useState<string>('')

  const [plugins, setPlugins] = useState<string[]>([
    'http://localhost:8080/plugin.json'
  ])

  useEffect(() => {
    plugins.forEach(plugin => {
      PluginManager.loadPlugin(plugin)
    })
  }, [])

  // Events //

  const handleNewPluginUrlChange = (event: FormEvent<HTMLInputElement>) => {
    setNewPluginUrl(event.currentTarget.value)
  }

  const handleAddPlugin = (event: FormEvent<HTMLButtonElement>) => {
    event.preventDefault()
    if (newPluginUrl && !Object.values(PluginManager.plugins).some(plugin => plugin.url === newPluginUrl)) {
      setPlugins([...plugins, newPluginUrl])
      setNewPluginUrl('')
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
          Add a plugin
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
              onClick={handleAddPlugin}>
              Add
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

export default Plugins