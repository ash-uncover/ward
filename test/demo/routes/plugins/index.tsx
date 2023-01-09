import React from 'react'
import Plugins from '../../components/plugins/Plugins'
import { Outlet, useParams } from 'react-router-dom'
// Components

const RoutePlugins = () => {

  // Hooks //

  const params = useParams()
  const pluginId = params.pluginId ? decodeURIComponent(atob(params.pluginId!)) : ''

  // Rendering //

  return (
    <Plugins
      pluginId={pluginId}
    >
      <Outlet />
    </Plugins>
  )
}

export default RoutePlugins
