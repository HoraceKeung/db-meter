<template>
	<div class="card bg-light p-3 mb-3">
		<div class="row">
			<div class="col-sm-6 col-md-4 col-lg-6 mb-3">
				<label>Background color</label>
				<chrome v-model="color"/>
			</div>
			<div class="col-sm-6 col-md-8 col-lg-6">
				<label>Logo</label>
				<div><croppa v-model="crop" @draw="draw" @new-image-drawn="draw" @image-remove="$store.commit('setLogo', null)" :width="250" :height="250" :zoom-speed="30" remove-button-color="#dc3545"/></div>
			</div>
		</div>
	</div>
</template>

<script>
import { Chrome } from 'vue-color'
import debounce from 'lodash.debounce'
export default {
	components: {Chrome},
	computed: {
		color: {
			get () { return this.$store.state.color || '#000' },
			set (val) { this.$store.commit('setColor', val) }
		}
	},
	methods: {
		draw () { this.saveLogo(this.$store, this.crop) },
		saveLogo: debounce((store, crop) => { store.commit('setLogo', crop.generateDataUrl()) }, 100)
	},
	data () {
		return {
			crop: {}
		}
	}
}
</script>
