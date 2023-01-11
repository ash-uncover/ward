import Logger from '@uncover/js-utils-logger'
const LOGGER = new Logger('CONFIG')

const CONFIG: {
  WARD_DEMO_PLUGINS_PLUGIN: string
  WARD_DEMO_PLUGINS_PUBLIC: string
  WARD_DEMO_PLUGINS_ENVIRONMENT: string
} = {
  WARD_DEMO_PLUGINS_PLUGIN: 'http://localhost:27002/plugin.json',
  WARD_DEMO_PLUGINS_PUBLIC: '',
  WARD_DEMO_PLUGINS_ENVIRONMENT: 'local',
}

// Load config from env
try {
  // This cannot be factorized since webpack simply replace the full process.env.[property] strings
  if (process.env.WARD_DEMO_PLUGINS_PLUGIN) {
    CONFIG.WARD_DEMO_PLUGINS_PLUGIN = process.env.WARD_DEMO_PLUGINS_PLUGIN
  }
  if (process.env.WARD_DEMO_PLUGINS_PUBLIC) {
    CONFIG.WARD_DEMO_PLUGINS_PUBLIC = process.env.WARD_DEMO_PLUGINS_PUBLIC
  }
  if (process.env.WARD_DEMO_PLUGINS_ENVIRONMENT) {
    CONFIG.WARD_DEMO_PLUGINS_ENVIRONMENT = process.env.WARD_DEMO_PLUGINS_ENVIRONMENT
  }
} catch (error) {
  LOGGER.warn('Failed to load from process.env')
}

console.log('CONFIG')

Object.keys(CONFIG).forEach((confKey: string) => {
  // @ts-ignore
  console.log(` - ${confKey}: '${CONFIG[confKey]}'`)
})

export default CONFIG
