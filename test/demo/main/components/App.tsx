import React, { ReactNode } from 'react'
import { Link } from 'react-router-dom'

import { PluginManager } from '../../../../src'

import './App.css'
import { useProviders } from '../../commons/WardProvider'

export interface AppProperties {
  children: ReactNode
}

export const App = ({
  children
}: AppProperties) => {

  // Hooks //

  // Events //

  // Rendering //

  const viewers = useProviders('ward-demo/viewers') || []

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
