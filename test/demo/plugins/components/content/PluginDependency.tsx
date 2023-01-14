import React from 'react'
import { PluginManager } from '../../../../../src'
import { Link } from 'react-router-dom'

import './PluginDependency.css'
import { usePlugin } from '../../../commons/WardProvider'

export interface PluginDependencyProperties {
  pluginId: string
}

export const PluginDependency = ({
  pluginId
}: PluginDependencyProperties) => {

  // Rendering //

  const plugin = usePlugin(pluginId)

  if (!plugin) {
    return (
      <li>PROBLEM</li>
    )
  }
  
  return (
    <li>
      <Link
        to={`/plugins/${window.btoa(encodeURIComponent(plugin.name))}`}
      >
       {plugin.name}
      </Link>
    </li>
  )
}