/* eslint-disable */
const path = require('path')
require('dotenv').config() // Using .env in nuxt.config.js requires this
export default {
  /*
   ** Nuxt rendering mode
   ** See https://nuxtjs.org/api/configuration-mode
   */
  // mode: 'universal', // Deprecated
  ssr: false,
  /*
   ** Nuxt target
   ** See https://nuxtjs.org/api/configuration-target
   */
  target: 'server',
  /*
   ** Nuxt server
   ** See https://nuxtjs.org/api/configuration-server
   */
  server: {
    port: process.env.PORT || 3000,
    host: process.env.HOST || `0.0.0.0`,
    /*
     ** Nuxt timing api
     ** See https://nuxtjs.org/api/configuration-server/#using-timing-api
     */
    timing: false,
  },
  /*
   ** Nuxt root directory
   ** See https://nuxtjs.org/api/configuration-srcdir
   */
  srcDir: 'client/',
  /*
   ** Headers of the page
   ** See https://nuxtjs.org/api/configuration-head
   */
  head: {
    title: process.env.TITLE || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: process.env.DESCRIPTION || '',
      },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },
  /*
   ** Customize the progress-bar color
   */
  loading: { color: 'green' },
  /*
   ** Customize how page and layout transition looks
   */
  layoutTransition: {
    // Is "layout" by default
    name: 'fade',
    mode: 'out-in'
  },
  pageTransition: {
    // Is "page" by default
    name: 'slide-fade',
    mode: 'out-in',
  },
  /*
   ** Global CSS
   */
  css: [
    '~/assets/css/animate.css/all.min.css',
    '~/assets/scss/main.scss', // CSS class customization can cause confliction with other ui package
  ],
  /*
   ** Import scss resource in every component
   ** For global color variables, use CSS variables in :root{}
   ** For color configuration, go to ~/assets/scss/base/utitlities/_variants.scss
   */
  styleResources: {
    scss: ['~/assets/scss/base/styleResources/mixins.scss'],
  },
  /*
   ** Plugins to load before mounting the App
   ** https://nuxtjs.org/guide/plugins
   */
  plugins: [
    // Services
    '~/services/auth.js',
    '~/services/client.js',
    // Plugins
    '~/plugins/element-ui',
    '~/plugins/i18n.js',
    // Utilities
    '~/utils/index.js',
  ],
  /*
   ** Auto import components
   ** See https://nuxtjs.org/api/configuration-components
   */
  components: false,
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [
    // Doc: https://github.com/nuxt-community/eslint-module
    '@nuxtjs/eslint-module',
    // Doc: https://github.com/nuxt-community/nuxt-tailwindcss
    '@nuxtjs/tailwindcss',
  ],
  /*
  ** Nuxt.js modules
  */
 modules: [
   // Doc: https://axios.nuxtjs.org/usage
   '@nuxtjs/axios',
   // Doc: https://github.com/nuxt-community/dotenv-module
   // Doc: https://github.com/nuxt-community/dotenv-module#path
   // '@nuxtjs/dotenv',
   ['@nuxtjs/dotenv', { path: './' }],
    [
      'nuxt-fontawesome',
      {
        component: 'fa',
        imports: [
          {
            set: '@fortawesome/free-solid-svg-icons',
            icons: ['fas']
          },
          {
            set: '@fortawesome/free-brands-svg-icons',
            icons: ['fab']
          }
        ]
      }
    ],
    '@nuxtjs/style-resources'
  ],
  /*
   ** Axios module configuration
   ** See https://axios.nuxtjs.org/options
   */
  axios: {
    baseURL: process.env.API_URL || 'http://localhost:3005',
    retry: { retries: 3 } // Retry if fail
  },
  /*
   ** Build configuration
   ** See https://nuxtjs.org/api/configuration-build/
   */
  build: {
    transpile: [
      /^element-ui/,
    ],
    /*
     ** You can extend webpack config here
     */
    babel: {
      plugins: [
        '@babel/plugin-proposal-optional-chaining'
      ]
    },
    extend(config, ctx) {
      const alias = config.resolve.alias = config.resolve.alias || {}
      // Run ESLint on save
      if (ctx.isDev && ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/,
          options: {
            fix: true
          },
        })
      }
      config.node = {
        fs: 'empty',
      }
      alias['~functions'] = path.resolve(__dirname, './client/utils/functions')
      // Template paths
      const templatePath = './client/components/common/Templates'
      alias['~templates'] = path.resolve(__dirname, templatePath)
      alias['~dialog'] = path.resolve(__dirname, templatePath + '/Dialog')
      alias['~form'] = path.resolve(__dirname, templatePath + '/Form')
      alias['~input'] = path.resolve(__dirname, templatePath + '/Input')
      alias['~table'] = path.resolve(__dirname, templatePath + '/Table')
    }
  },
  router: {
    // base: '.'
    middleware: ['nuxtServerInit']
  },
  // For ssr only, so please use own ssr boilerplate instead: https://github.com/thecodeorigin/nuxt-element-tailwind
  generate: {}
}
