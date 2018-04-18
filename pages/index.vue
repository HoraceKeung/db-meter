<template>
	<section>
		<div>
			<select v-model="audioSource" :disabled="measuring">
				<option v-for="d in audioDevices" :key="d.deviceId" :value="d.deviceId" :selected="d.deviceId===audioSource">{{d.label}}</option>
			</select>
			<input type="number">
			<div class="btn-group" role="group" aria-label="Control buttons">
				<button type="button" class="btn btn-success" @click="start" :disabled="measuring">Start</button>
				<button type="button" class="btn btn-warning" @click="finish">Finish</button>
				<button type="button" class="btn btn-danger" @click="reset">Reset</button>
			</div>
			<p>{{Math.round(measuring?decibel:maxRecord)}}dB</p>
		</div>
	</section>
</template>

<script>
import AudioStreamMeter from 'audio-stream-meter'
export default {
	mounted () {
		this.$nextTick(() => {
			// https://webrtc.github.io/samples/src/content/devices/input-output/
			navigator.mediaDevices.enumerateDevices().then(devices => {
				this.audioDevices = devices.filter(d => d.kind === 'audioinput')
				this.audioSource = this.audioDevices.length > 0 ? this.audioDevices[0].deviceId : null
			})
		})
	},
	methods: {
		start () {
			navigator.mediaDevices.getUserMedia({audio: {deviceId: this.audioSource ? {exact: this.audioSource} : undefined}}).then(stream => {
				window.stream = stream
				this.audioContext = new AudioContext()
				this.mediaStream = this.audioContext.createMediaStreamSource(stream)
				this.meter = AudioStreamMeter.audioStreamProcessor(this.audioContext, () => {
					this.decibel = 20 * Math.log10(this.meter.volume * Math.pow(10, this.maxDb / 20))
					this.maxRecord = this.maxRecord > this.decibel ? this.maxRecord : this.decibel
				})
				this.mediaStream.connect(this.meter)
				stream.onended = this.meter.close.bind(this.meter)
				this.measuring = true
			})
		},
		finish () {
			if (window.stream) { window.stream.getTracks().forEach(track => { track.stop() }) }
			if (this.audioContext) { this.audioContext.close(); this.audioContext = null }
			if (this.mediaStream) { this.mediaStream.disconnect(); this.mediaStream = null }
			this.meter = null
			this.decibel = 0
			this.measuring = false
		},
		reset () {
			this.finish()
			this.maxRecord = 0
		}
	},
	data () {
		return {
			measuring: false,
			audioDevices: [],
			audioSource: null,
			audioContext: null,
			meter: null,
			mediaStream: null,
			decibel: 0,
			maxDb: 140,
			maxRecord: 0
		}
	}
}
</script>

<style scoped>
</style>
