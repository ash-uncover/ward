import React from 'react'

import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
} from 'react-router-dom'

import RouteRoot from './index'
import RouteMessages from './messages/index'
import RoutePlugins from './plugins/index'
import RoutePlugin from './plugins/#pluginId/index'

const Root = () => {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<RouteRoot />}>
          <Route path='messages' element={<RouteMessages />} />
          <Route path='plugins' element={<RoutePlugins />}>
            <Route path=':pluginId' element={<RoutePlugin />} />
          </Route>
        </Route>
      </Routes>
    </Router>
  )
}

export default Root
