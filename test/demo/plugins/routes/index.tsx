import React from 'react'
import { Outlet, useParams } from 'react-router-dom'
// Components
import App from '../components/App'
import { WardProvider } from '../../commons/WardProvider'

import CONFIG from '../config'

const RoutePlugins = () => {

  // Hooks //

  const params = useParams()
  const pluginId = params.pluginId ? decodeURIComponent(atob(params.pluginId!)) : ''

  // Rendering //

  return (
    <WardProvider plugin={CONFIG.WARD_DEMO_PLUGINS_PLUGIN}>
      <App pluginId={pluginId}>
        <Outlet />
      </App>
    </WardProvider>
  )
}

export default RoutePlugins
