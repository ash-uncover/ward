import React from 'react'
import Plugins from '../../components/plugins/Plugins'
import { Outlet } from 'react-router-dom'
// Components

const RoutePlugins = () => {

  // Rendering //

  return (
    <Plugins>
      <Outlet />
    </Plugins>
  )
}

export default RoutePlugins
