const path = require('path')
const prodRouterBase = process.env.NODE_ENV === 'development' ? {} : {router: {base: './'}}

module.exports = {...prodRouterBase,
	mode: 'spa',
	head: {title: 'Decibel meter'}, // Headers of the page
	loading: false, // Disable default loading bar
	generate: {dir: 'dist/electron'},
	build: {
		extend (config, { isDev, isClient }) {
			// Fix deepmerge webpack bug: https://www.npmjs.com/package/deepmerge
			const alias = config.resolve.alias = config.resolve.alias || {}
			alias['deepmerge$'] = path.resolve(__dirname, 'node_modules/deepmerge/dist/umd.js')
			if (isDev && isClient) {
				// Run ESLint on save
				config.module.rules.push({
					enforce: 'pre',
					test: /\.(js|vue)$/,
					loader: 'eslint-loader',
					exclude: /(node_modules)/
				})
			}
			// Extend only webpack config for client-bundle
			if (isClient) { config.target = 'electron-renderer' }
		}
	},
	dev: process.env.NODE_ENV === 'development',
	css: [
		'bootstrap-css-only/css/bootstrap.css',
		'vue-croppa/dist/vue-croppa.css',
		'@/assets/css/global.css'
	],
	rootDir: __dirname,
	plugins: ['~/plugins/init.js']
}
