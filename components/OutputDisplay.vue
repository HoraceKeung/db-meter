<template>
	<div class="border" :style="'background-color: '+rgba+';'">
		<span class="text-white">{{measuring?decibel:maxRecord}}dB</span>
	</div>
</template>

<script>
export default {
	computed: {
		measuring () { return this.$store.state.measuring },
		decibel () { return this.$store.state.decibel },
		maxRecord () { return this.$store.state.maxRecord },
		rgba () {
			if (this.$store.state.color.rgba) {
				const r = this.$store.state.color.rgba.r
				const g = this.$store.state.color.rgba.g
				const b = this.$store.state.color.rgba.b
				const a = this.$store.state.color.rgba.a
				return 'rgba(' + [r, g, b, a].join(', ') + ')'
			} else { return '#000' }
		}
	}
}
</script>
