import React from 'react'
import { Outlet } from 'react-router-dom'
// Components
import App from '../components/App'

const RouteRoot = () => {

  // Hooks //


  // Rendering //

  return (
    <App>
      <Outlet />
    </App>
  )
}

export default RouteRoot
