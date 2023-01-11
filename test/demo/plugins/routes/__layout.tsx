import React from 'react'

import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
} from 'react-router-dom'

import RouteRoot from './index'
import RoutePlugin from './#pluginId/index'

const Root = () => {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<RouteRoot />}>
          <Route path=':pluginId' element={<RoutePlugin />} />
        </Route>
      </Routes>
    </Router>
  )
}

export default Root
