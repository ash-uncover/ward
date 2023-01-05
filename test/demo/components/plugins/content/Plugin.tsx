import React, { FormEvent, ReactNode, useEffect, useState } from 'react'
import PluginManager from '../../../../../src/lib/plugin/PluginManager'
import { PluginDefinition } from './PluginDefinition'

import './Plugin.css'
import { PluginProvider } from './PluginProvider'
import { PluginDependency } from './PluginDependency'

interface PluginProperties {
  pluginId?: string
}

const Plugin = ({
  pluginId
}: PluginProperties) => {

  const pluginIdClear = decodeURIComponent(atob(pluginId!))

  const plugin = PluginManager.getPlugin(pluginIdClear)

  // Hooks //

  // Events //

  // Rendering //

  const renderDependencies = () => {
    return plugin!.dependencies.map(dependency => {
      return (
        <PluginDependency
          key={dependency}
          dependencyUrl={dependency}
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
          providerId={provide.name}
        />
      )
    })
  }

  if (plugin) {
    return (
      <div className='plugin'>
        <h2>Plugin: {plugin.name}</h2>
        <div>
          <label>Loaded from:</label>
          <span>{plugin.loadedFrom}</span>
        </div>
        <div>
          <label>Name:</label>
          <span>{plugin.name}</span>
        </div>
        <div>
          <label>Url:</label>
          <span>{plugin.url}</span>
        </div>

        <h2>Dependencies</h2>
        <ul>
          {renderDependencies()}
        </ul>

        <h2>Defines</h2>
        <ul>
          {renderDefinitions()}
        </ul>

        <h2>Provides</h2>
        <ul>
          {renderProviders()}
        </ul>
      </div>
    )
  }

  return null
}

export default Plugin