import React, { FormEvent, ReactNode, useEffect, useState } from 'react'

import PluginManager from '../../../../src/lib/plugin/PluginManager'

import './Plugins.css'
import { Link } from 'react-router-dom'

interface PluginsProperties {
  children: ReactNode
}

const Plugins = ({
  children
}: PluginsProperties) => {

  // Hooks //

  const [newPluginUrl, setNewPluginUrl] = useState<string>('')

  const [plugins, setPlugins] = useState<string[]>([
    'http://localhost:27000/plugin.json'
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

        <h1>
          Plugins
        </h1>

        <h2>
          Add a plugin
        </h2>

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

        <h2>
          Plugin list
        </h2>

        <ul>
          {Object.values(PluginManager.plugins).map(plugin => {
            return (
              <li
                key={plugin.url}
                title={plugin.url}
              >
                <Link
                  to={`${window.btoa(encodeURIComponent(plugin.name))}`}
                >
                  {plugin.name}
                </Link>
              </li>
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