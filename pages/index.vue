<template>
	<section class="container-fluid py-3">
		<div class="row">
			<div class="col-lg-6">
				<input-control/>
				<brand-control/>
				<display-control/>
				<div class="card bg-light p-3 mb-3">
					<div class="ml-auto btn-group">
						<button type="button" class="btn btn-success" @click="start" :disabled="measuring">Start</button>
						<button type="button" class="btn btn-warning" @click="finish">Finish</button>
						<button type="button" class="btn btn-danger" @click="reset">Reset</button>
					</div>
				</div>
			</div>
			<div class="col-lg-6"><output-display/></div>
		</div>
	</section>
</template>

<script>
import AudioStreamMeter from 'audio-stream-meter'
import throttle from 'lodash.throttle'
import InputControl from '~/components/InputControl'
import BrandControl from '~/components/BrandControl'
import DisplayControl from '~/components/DisplayControl'
import OutputDisplay from '~/components/OutputDisplay'
export default {
	components: {InputControl, BrandControl, DisplayControl, OutputDisplay},
	computed: {
		audioSource () { return this.$store.state.audioSource },
		measuring () { return this.$store.state.measuring },
		maxDb () { return this.$store.state.maxDb },
		decibel () { return this.$store.state.decibel },
		maxRecord () { return this.$store.state.maxRecord }
	},
	methods: {
		start () {
			navigator.mediaDevices.getUserMedia({audio: {deviceId: this.audioSource ? {exact: this.audioSource} : undefined}}).then(stream => {
				window.stream = stream
				this.audioContext = new AudioContext()
				this.mediaStream = this.audioContext.createMediaStreamSource(stream)
				this.meter = AudioStreamMeter.audioStreamProcessor(this.audioContext, throttle(() => {
					if (this.meter) {
						const db = Math.round(20 * Math.log10(this.meter.volume * Math.pow(10, this.maxDb / 20)))
						if (db !== this.decibel && db !== -Infinity) {
							this.$store.commit('setDecibel', db)
							if (db > this.maxRecord) { this.$store.commit('setMaxRecord', db) }
						}
					}
				}, 1000 / this.refreshRate), {inputChannels: this.$store.state.numOfInputChannels, throttle: 10})
				this.mediaStream.connect(this.meter)
				stream.onended = this.meter.close.bind(this.meter)
				this.$store.commit('setMeasuring', true)
			})
		},
		finish () {
			if (window.stream) { window.stream.getTracks().forEach(track => { track.stop() }) }
			if (this.audioContext) { this.audioContext.close(); this.audioContext = null }
			if (this.mediaStream) { this.mediaStream.disconnect(); this.mediaStream = null }
			this.meter = null
			this.$store.commit('setDecibel', 0)
			this.$store.commit('setMeasuring', false)
		},
		reset () {
			this.finish()
			this.$store.commit('setMaxRecord', 0)
		}
	},
	data () {
		return {
			audioContext: null,
			meter: null,
			mediaStream: null,
			refreshRate: 10 // Refresh per second
		}
	}
}
</script>
