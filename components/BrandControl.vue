<template>
	<div class="card bg-light p-3 mb-3">
		<div class="row">
			<div class="col-sm-6 col-md-4 col-lg-6 mb-3">
				<label>Background color</label>
				<chrome v-model="color"/>
			</div>
			<div class="col-sm-6 col-md-8 col-lg-6">
				<label>Logo</label>
			</div>
		</div>
	</div>
</template>

<script>
import { Chrome } from 'vue-color'
export default {
	components: {Chrome},
	computed: {
		color: {
			get () { return this.$store.state.color },
			set (val) { this.$store.commit('setColor', val) }
		}
	}
}
</script>
