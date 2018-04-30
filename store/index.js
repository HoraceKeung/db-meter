import VuexPersist from 'vuex-persistfile'
const app = require('electron').remote.app

const persist = new VuexPersist({
	path: app.getPath('userData'),
	reducer: (state) => {
		return {
			maxDb: state.maxDb,
			numOfInputChannels: state.numOfInputChannels,
			color: state.color,
			logo: state.logo
		}
	}
})

export const plugins = [persist.subscribe()]

export const state = () => ({
	audioSource: null,
	measuring: false,
	maxDb: 140,
	decibel: 0,
	maxRecord: 0,
	numOfInputChannels: 2,
	color: null,
	logo: null
})

export const mutations = {
	setAudioSource (state, src) {
		state.audioSource = src
	},
	setMeasuring (state, bool) {
		state.measuring = bool
	},
	setMaxDb (state, db) {
		state.maxDb = db
	},
	setDecibel (state, db) {
		state.decibel = db
	},
	setMaxRecord (state, db) {
		state.maxRecord = db
	},
	setNumOfInputChannels (state, num) {
		state.numOfInputChannels = num
	},
	setColor (state, color) {
		state.color = color
	},
	setLogo (state, logo) {
		state.logo = logo
	}
}
