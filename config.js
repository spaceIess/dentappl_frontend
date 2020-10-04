const DEFAULT = {
  baseUrl: 'http://localhost:3000',
  appToken: '0ec5592055d1213f2b11792dc565ef712f458e2dbf3679350f3c52104d5ca443784a059bb5f7363e682be7224af419b06171f0481f5bb9b2b1f03a46c5906dc7'
}

const development = {

}

const staging = {
  baseUrl: process.env.BASE_URL,
  appToken: process.env.APP_TOKEN
}

const production = {
  baseUrl: process.env.BASE_URL,
  appToken: process.env.APP_TOKEN
}

const CONFIG = {
  development,
  staging,
  production
}

module.exports = {
  ...DEFAULT,
  ...CONFIG[process.env.NODE_ENV]
}
