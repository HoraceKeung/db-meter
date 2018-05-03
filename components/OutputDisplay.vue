<template>
	<div class="d-flex flex-column">
		<div :class="'d-flex'+(demo?' border':'')" :style="'background-color: '+rgba+';'">
			<div><img class="w-100" :src="baseUrl+'/img/db_meter_overlay.png'"></div>
			<div class="position-relative">
				<div class="position-absolute" style="bottom: 0; right: 0;">
					<h1 :class="'text-white mr-3 '+(demo?'demo-':'')+'db-text'">{{db}}dB</h1>
				</div>
				<div v-for="n in 23" v-show="n <= numOfBars" :key="'bar'+n" class="position-absolute h-100" style="bottom: 0; right: 0;">
					<img class="h-100" :src="baseUrl+'/img/bar/'+n+'.png'">
				</div>
			</div>
		</div>
		<div class="position-relative">
			<div class="position-absolute w-100 text-center" style="bottom: 0;">
				<img v-if="$store.state.logo" style="width: 10%;" :src="$store.state.logo">
			</div>
		</div>
	</div>
</template>

<script>
export default {
	props: {
		demo: {type: Boolean, default: true}
	},
	computed: {
		rgba () {
			if (this.$store.state.color && this.$store.state.color.rgba) {
				const r = this.$store.state.color.rgba.r
				const g = this.$store.state.color.rgba.g
				const b = this.$store.state.color.rgba.b
				const a = this.$store.state.color.rgba.a
				return 'rgba(' + [r, g, b, a].join(', ') + ')'
			} else { return '#000' }
		},
		db () { return this.$store.state.measuring ? this.$store.state.decibel : this.$store.state.maxRecord },
		numOfBars () { return this.db > 0 ? Math.round(23 * this.db / this.$store.state.maxDb) : 0 }
	}
}
</script>

<style scoped>
.db-text, .demo-db-text {
	font-size: 6vw;
}
@media (min-width: 992px) {
	.demo-db-text {
		font-size: 3vw;
	}
}
</style>
