import React from 'react'
import { Outlet, useParams } from 'react-router-dom'
// Components
import Plugin from '../../../components/plugins/content/Plugin'

const RoutePlugins = () => {

  // Hooks //

  const params = useParams()
  const pluginId = params.pluginId

  // Rendering //

  return (
    <Plugin
      pluginId={pluginId}
    />
  )
}

export default RoutePlugins
