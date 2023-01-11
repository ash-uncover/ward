import React from 'react'

import {
  BrowserRouter as Router,
  Route,
  Routes,
} from 'react-router-dom'

import RouteRoot from './index'

const Root = () => {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<RouteRoot />}>
        </Route>
      </Routes>
    </Router>
  )
}

export default Root
