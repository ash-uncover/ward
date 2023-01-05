import React, { ReactNode } from 'react'
import { Link } from 'react-router-dom'

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

  return (
    <div className='app'>
      <div className='app__header'>
        <Link to='/messages'>
          Messages
        </Link>
        <Link to='/plugins'>
          Plugins
        </Link>
      </div>

      <div className='app__content'>
        {children}
      </div>
    </div>
  )

}

export default App