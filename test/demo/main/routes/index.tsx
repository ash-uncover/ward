import React from 'react'
import { Outlet } from 'react-router-dom'
// Components
import { App } from '../components/App'
import { WardProvider } from '../../commons/WardProvider'
import { WardDevTools } from '../../commons/WardDevTools'

import CONFIG from '../config'

const RouteRoot = () => {

  // Hooks //


  // Rendering //

  return (
    <WardProvider plugin={CONFIG.WARD_DEMO_PLUGIN}>
      <App>
        <Outlet />
      </App>
      <WardDevTools />
    </WardProvider>
  )
}

export default RouteRoot
