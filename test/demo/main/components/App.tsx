import React, { ReactNode } from 'react'
import { Link } from 'react-router-dom'

import { PluginManager } from '../../../../src'

import './App.css'

interface AppProperties {
  children: ReactNode
}

const App = ({
  children
}: AppProperties) => {

  // Hooks //

  // Events //

  // Rendering //

  const viewers = PluginManager.getProviders('ward-demo/viewers')
  console.log(viewers)

  return (
    <div className='app'>
      <div className='app__header'>
        <span>WARD</span>
        {viewers.map((viewer) => {
          return (
            <Link
              key={viewer.attributes.id}
              to={`/${viewer.attributes.id}`}
            >
              {viewer.attributes.name}
            </Link>
          )
        })}

      </div>

      <div className='app__content'>
        {children}
      </div>
    </div>
  )

}

export default App