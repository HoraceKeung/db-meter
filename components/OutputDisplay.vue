<template>
	<div class="border" :style="'background-color: '+rgba+';'">
		<img class="w-100" src="~/assets/img/db_meter_overlay.png">
		<div class="position-relative">
			<div class="position-absolute w-100 text-center" style="bottom: 0;">
				<img v-if="$store.state.logo" style="width: 10%;" :src="$store.state.logo">
			</div>
			<div class="position-absolute w-100 d-flex" style="bottom: 0;">
				<h1 class="db-text text-white ml-auto mr-3">{{measuring?decibel:maxRecord}}dB</h1>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	computed: {
		measuring () { return this.$store.state.measuring },
		decibel () { return this.$store.state.decibel },
		maxRecord () { return this.$store.state.maxRecord },
		rgba () {
			if (this.$store.state.color && this.$store.state.color.rgba) {
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

<style scoped>
</style>
