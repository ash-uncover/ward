import Logger from '@uncover/js-utils-logger'
const LOGGER = new Logger('CONFIG')

const CONFIG: {
  [key: string]: string
} = {
  DEV_SERVER_MAIN: 'http://localhost:27000',
  DEV_SERVER_CHILD: 'http://localhost:27001'
}

// Load config from env
try {
  // This cannot be factorized since webpack simply replace the full process.env.[property] strings
  if (process.env.DEV_SERVER_MAIN) {
    CONFIG.DEV_SERVER_MAIN = process.env.DEV_SERVER_MAIN
  }
  if (process.env.DEV_SERVER_CHILD) {
    CONFIG.DEV_SERVER_CHILD = process.env.DEV_SERVER_CHILD
  }
} catch (error) {
  LOGGER.warn('Failed to load from process.env')
}

console.log('CONFIG')

Object.keys(CONFIG).forEach((confKey: string) => {
  console.log(` - ${confKey}: '${CONFIG[confKey]}'`)
})

export default CONFIG
