import Vue from 'vue'
import Croppa from 'vue-croppa'
Vue.use(Croppa)
const app = require('electron').remote.app
Vue.mixin({
	computed: {
		baseUrl () {
			return process.env.NODE_ENV === 'development' ? '' : app.getAppPath() + '/dist/electron'
		}
	}
})
