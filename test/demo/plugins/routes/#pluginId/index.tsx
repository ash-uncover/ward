import React from 'react'
import { Outlet, useParams } from 'react-router-dom'
// Components
import Plugin from '../../components/content/Plugin'

const RoutePlugins = () => {

  // Hooks //

  const params = useParams()
  const pluginId = params.pluginId ? decodeURIComponent(atob(params.pluginId!)) : ''

  // Rendering //

  return (
    <Plugin
      pluginId={pluginId}
    />
  )
}

export default RoutePlugins
