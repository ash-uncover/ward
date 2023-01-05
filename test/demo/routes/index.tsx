import React from 'react'
// Components
import App from '../components/App'
import { Outlet } from 'react-router-dom'

const RouteRoot = () => {

  // Rendering //

  return (
    <App>
      <Outlet />
    </App>
  )
}

export default RouteRoot
