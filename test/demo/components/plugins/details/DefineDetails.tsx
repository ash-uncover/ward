import React from 'react'
import PluginManager from '../../../../../src/lib/plugin/PluginManager'
import { Link } from 'react-router-dom'

import './DefineDetails.css'

export interface DefineDetailsProperties {
  pluginId: string
  selectedPluginId?: string
}

export const DefineDetails = ({
  pluginId,
  selectedPluginId
}: DefineDetailsProperties) => {

  // Rendering //

  const plugin = PluginManager.getPlugin(pluginId)

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
      {plugin.dependencies ? (
        <ul className='plugin-side-entry__entries'>
          {plugin.dependencies.map(childUrl => {
            const child = PluginManager.getPluginByUrl(childUrl)
            return (
              <DefineDetails
                key={child!.name}
                selectedPluginId={selectedPluginId}
                pluginId={child!.name}
              />
            )
          })}
        </ul>
      ) : null}
    </li>
  )
}