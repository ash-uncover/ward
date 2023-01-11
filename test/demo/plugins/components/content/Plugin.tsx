import React from 'react'
import { PluginManager } from '../../../../../src'
import { PluginDefinition } from './PluginDefinition'

import './Plugin.css'
import { PluginProvider } from './PluginProvider'
import { PluginDependency } from './PluginDependency'

interface PluginProperties {
  pluginId: string
}

const Plugin = ({
  pluginId
}: PluginProperties) => {

  const plugin = PluginManager.getPlugin(pluginId)

  // Hooks //

  // Events //

  // Rendering //

  const renderDependencies = () => {
    console.log(plugin!.dependencies)
    return plugin!.dependencies
      .filter(dependency => dependency.loaded)
      .map(dependency => {
        return (
          <PluginDependency
            key={dependency.url}
            dependencyUrl={dependency.url}
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
        <div className='plugin__info'>
          <label>Loader:</label>
          <span>{plugin.loadedFrom}</span>
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