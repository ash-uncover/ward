import React from 'react'
import { Outlet, useParams } from 'react-router-dom'
// Components
import App from '../components/App'

const RoutePlugins = () => {

  // Hooks //

  const params = useParams()
  const pluginId = params.pluginId ? decodeURIComponent(atob(params.pluginId!)) : ''

  // Rendering //

  return (
    <App
      pluginId={pluginId}
    >
      <Outlet />
    </App>
  )
}

export default RoutePlugins
