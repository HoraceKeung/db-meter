import Vue from 'vue'
import Croppa from 'vue-croppa'
Vue.use(Croppa)
const app = require('electron').remote.app
Vue.mixin({
	computed: {
		baseUrl () {
			return process.env.NODE_ENV === 'development' ? '' : app.getAppPath() + '/dist/electron'
		},
		baseRoute () {
			return process.env.NODE_ENV === 'development' ? window.location.href : app.getAppPath() + '/dist/electron/index.html?page='
		}
	}
})

export default function ({ store }) {
	store.commit('setMeasuring', false)
	store.commit('setMaxRecord', 0)
	store.commit('setDecibel', 0)
}
