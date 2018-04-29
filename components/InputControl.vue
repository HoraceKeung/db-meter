<template>
	<div class="card bg-light p-3 mb-3">
		<div class="form-row">
			<div class="form-group col-md-6">
				<label>Input</label>
				<select v-model="audioSource" class="form-control" :disabled="measuring">
					<option v-for="d in audioDevices" :key="d.deviceId" :value="d.deviceId" :selected="d.deviceId===audioSource">{{d.label}}</option>
				</select>
			</div>
			<div class="form-group col-6 col-md-3">
				<label>Max decibel</label>
				<input v-model="maxDb" type="number" max="999" class="form-control" :disabled="measuring">
			</div>
			<div class="form-group col-6 col-md-3">
				<label>Channels</label>
				<input v-model="numOfInputChannels" type="number" min="1" max="32" class="form-control" :disabled="measuring">
			</div>
		</div>
	</div>
</template>

<script>
export default {
	created () {
		// https://webrtc.github.io/samples/src/content/devices/input-output/
		navigator.mediaDevices.enumerateDevices().then(devices => {
			this.audioDevices = devices.filter(d => d.kind === 'audioinput')
			this.$store.commit('setAudioSource', this.audioDevices.length > 0 ? this.audioDevices[0].deviceId : null)
		})
	},
	computed: {
		audioSource: {
			get () { return this.$store.state.audioSource },
			set (val) { this.$store.commit('setAudioSource', val) }
		},
		measuring () { return this.$store.state.measuring },
		maxDb: {
			get () { return this.$store.state.maxDb },
			set (val) { this.$store.commit('setMaxDb', parseInt(val)) }
		},
		numOfInputChannels: {
			get () { return this.$store.state.numOfInputChannels },
			set (val) { this.$store.commit('setNumOfInputChannels', parseInt(val)) }
		}
	},
	data () {
		return {
			audioDevices: []
		}
	}
}
</script>
