import React from 'react'
import { createRoot } from 'react-dom/client'
import Root from './routes/__layout'
import { PluginManager } from '../../../src'
import CONFIG from './config'

PluginManager.loadPlugin(CONFIG.WARD_DEMO_MESSAGES_PLUGIN)
  .then(() => {
    const containerRoot = document.getElementById('reactroot')!
    const root = createRoot(containerRoot)
    root.render(
      <Root />
    )
  })
