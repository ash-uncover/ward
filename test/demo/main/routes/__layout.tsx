import React from 'react'

import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
} from 'react-router-dom'

import RouteRoot from './index'
import RouteViewer from './#viewerId'

const Root = () => {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<RouteRoot />}>
          <Route path=':viewerId' element={<RouteViewer />} />
        </Route>
      </Routes>
    </Router>
  )
}

export default Root
