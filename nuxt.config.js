import colors from 'vuetify/es5/util/colors'
import CONFIG from './config'
console.log(CONFIG)

export default {
  publicRuntimeConfig: {
    baseURL: 'https://nuxtjs.org'
  },
  privateRuntimeConfig: {
    apiSecret: 2
  },
  target: 'server',
  head: {
    titleTemplate: '%s - ' + process.env.npm_package_name,
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  css: [
  ],
  plugins: [
  ],
  components: true,
  buildModules: [
    '@nuxtjs/eslint-module',
    '@nuxtjs/stylelint-module',
    '@nuxtjs/vuetify',
    '@nuxtjs/dotenv'
  ],
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    '@nuxtjs/proxy',
    '@nuxtjs/auth'
  ],
  server: {
    port: 8000, // default: 3000
    timing: false
  },
  axios: {
    baseURL: CONFIG.baseUrl,
    credentials: true,
    proxy: true
  },
  proxy: {
    '/api/': { target: `${CONFIG.baseUrl}/api/v2`, pathRewrite: { '^/api/': '' } },
    '/_api/': { target: `${CONFIG.baseUrl}/api/v1`, pathRewrite: { '^/_api/': '' } }
  },
  router: {
    middleware: ['authentication']
  },
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    theme: {
      dark: true,
      themes: {
        dark: {
          primary: colors.blue.darken2,
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3
        }
      }
    }
  },
  build: {

  },
  auth: {
    redirect: {
      login: '/login',
      logout: '/',
      callback: '/login',
      home: false
    },
    strategies: {
      local: {
        tokenType: false,
        autoFetchUser: false,
        endpoints: {
          login: { url: '/api/sessions', method: 'post', propertyName: 'payload.session.token' },
          logout: { url: '/api/auth/logout', method: 'post' },
          // user: { url: '/_api/me', method: 'get', propertyName: false }
          user: false
        }
      }
    }
  }
}
