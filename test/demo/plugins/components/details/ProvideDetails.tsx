import React from 'react'
import { PluginManager } from '../../../../../src'
import { Link } from 'react-router-dom'

import './ProvideDetails.css'
import { usePlugin } from '../../../commons/WardProvider'

export interface ProvideDetailsProperties {
  pluginId: string
  selectedPluginId?: string
}

export const ProvideDetails = ({
  pluginId,
  selectedPluginId
}: ProvideDetailsProperties) => {

  // Rendering //

  const plugin = usePlugin(pluginId)

  if (!plugin) {
    return (
      <li>PROBLEM</li>
    )
  }

  const classes = ['plugin-side-entry']
  if (selectedPluginId === pluginId) {
    classes.push('selected')
  }

  return (
    <li
      className={classes.join(' ')}
      title={plugin.url}
    >
      <Link
        to={`${window.btoa(encodeURIComponent(plugin.name))}`}
      >
        {plugin.name}
      </Link>
      <ul className='plugin-side-entry__entries'>
        {(plugin.dependencies || [])
          .map(dependency => {
            return (
              <ProvideDetails
                key={dependency.name}
                selectedPluginId={selectedPluginId}
                pluginId={dependency.name}
              />
            )
          })}
      </ul>
    </li>
  )
}