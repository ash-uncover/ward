import React from 'react'
import { createRoot } from 'react-dom/client'

import { PluginManager } from '../../../src'

import CONFIG from './config'

import Root from './routes/__layout'

PluginManager.loadPlugin(CONFIG.WARD_DEMO_PLUGIN)
  .then(() => {
    const containerRoot = document.getElementById('reactroot')!
    const root = createRoot(containerRoot)
    root.render(
      <Root />
    )
  })
