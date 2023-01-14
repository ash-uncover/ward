import React from 'react'
import { PluginDefinition } from './PluginDefinition'

import { PluginProvider } from './PluginProvider'
import { PluginDependency } from './PluginDependency'
import { usePlugin } from '../../../commons/WardProvider'

import './Plugin.css'

interface PluginProperties {
  pluginId: string
}

const Plugin = ({
  pluginId
}: PluginProperties) => {

  const plugin = usePlugin(pluginId)

  // Hooks //

  // Events //

  // Rendering //

  const renderDependencies = () => {
    return (plugin.dependencies)
      .map(dependency => {
        return (
          <PluginDependency
            key={dependency.name}
            pluginId={dependency.name}
          />
        )
      })
  }

  const renderDefinitions = () => {
    return plugin!.defines.map(define => {
      return (
        <PluginDefinition
          key={define.name}
          definitionId={define.name}
        />
      )
    })
  }

  const renderProviders = () => {
    return plugin!.provides.map(provide => {
      return (
        <PluginProvider
          key={provide.name}
          providerId={`${provide.define}/${provide.name}`}
        />
      )
    })
  }

  if (plugin) {
    return (
      <div className='plugin'>

        <h2>Plugin: {plugin.name}</h2>
        <div className='plugin__info'>
          <label>Name:</label>
          <span>{plugin.name}</span>
        </div>
        <div className='plugin__info'>
          <label>Url:</label>
          <span>{plugin.url}</span>
        </div>

        <h2>{`Dependencies (${plugin!.dependencies.length})`}</h2>
        <ul>
          {renderDependencies()}
        </ul>

        <h2>{`Defines (${plugin!.defines.length})`}</h2>
        <ul>
          {renderDefinitions()}
        </ul>

        <h2>{`Provides (${plugin!.provides.length})`}</h2>
        <ul>
          {renderProviders()}
        </ul>
      </div>
    )
  }

  return null
}

export default Plugin