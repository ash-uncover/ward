import React from 'react'
import { createRoot } from 'react-dom/client'
import Root from './routes/__layout'

const containerRoot = document.getElementById('reactroot')!
const root = createRoot(containerRoot)

root.render(
  <Root />
)
