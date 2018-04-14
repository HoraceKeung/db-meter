<template>
	<section>
		<div>
			<p>{{Math.round(decibel)}}dB</p>
		</div>
	</section>
</template>

<script>
import AudioStreamMeter from 'audio-stream-meter'
export default {
	mounted () {
		this.$nextTick(() => {
			navigator.mediaDevices.getUserMedia({audio:true}).then(stream => {
				this.audioContext = new AudioContext()
				this.mediaStream = this.audioContext.createMediaStreamSource(stream)
				this.meter = AudioStreamMeter.audioStreamProcessor(this.audioContext, () => {
					this.decibel = 20 * Math.log10(this.meter.volume * Math.pow(10, this.maxDb / 20))
				})
				this.mediaStream.connect(this.meter)
				stream.onended = this.meter.close.bind(this.meter)
			})
		})
	},
	data () {
		return {
			audioContext: null,
			meter: null,
			mediaStream: null,
			decibel: 0,
			maxDb: 140
		}
	}
}
</script>

<style scoped>
</style>
