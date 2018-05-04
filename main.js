/*
**  Nuxt
*/
let config = require('./nuxt.config.js')
let _NUXT_URL_ = null
// Build only in dev mode
if (config.dev) {
	const http = require('http')
	const { Nuxt, Builder } = require('nuxt')
	const nuxt = new Nuxt(config)
	const builder = new Builder(nuxt)
	const server = http.createServer(nuxt.render)
	builder.build().catch(err => {
		console.error(err) // eslint-disable-line no-console
		process.exit(1)
	})
	// Listen the server
	server.listen()
	_NUXT_URL_ = `http://localhost:${server.address().port}`
} else {
	_NUXT_URL_ = `file://${__dirname}/index.html`
}

/*
** Electron
*/
require('electron-debug')({showDevTools: true})
let win = null // Current window
const electron = require('electron')
const path = require('path')
const app = electron.app
const newWin = () => {
	win = new electron.BrowserWindow({
		icon: path.join(__dirname, 'static/icon.png'),
		autoHideMenuBar: true,
		backgroundColor: '#0f3b60',
		show: false
	})
	if (config.dev) {
		// Install vue dev tool
		const { default: installExtension, VUEJS_DEVTOOLS } = require('electron-devtools-installer')
		installExtension(VUEJS_DEVTOOLS.id).catch(err => console.log('An error occurred: ', err))	
	}
	win.loadURL(_NUXT_URL_)
	win.once('ready-to-show', () => { win.show(); win.maximize() })
	win.on('closed', () => { win = null; app.quit() })
}
app.on('ready', newWin)
app.on('window-all-closed', () => app.quit())
app.on('activate', () => win === null && newWin())
