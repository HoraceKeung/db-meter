<template>
	<section>
		<output-display :demo="false"/>
	</section>
</template>

<script>
import merge from 'deepmerge'
import fs from 'fs'
import {remote} from 'electron'
import OutputDisplay from '~/components/OutputDisplay'
export default {
	components: {OutputDisplay},
	created () {
		this.path = require('path').join(remote.app.getPath('userData'), 'store.json')
		this.$options.interval = setInterval(this.syncState, 100)
	},
	methods: {
		syncState () {
			const data = fs.readFileSync(this.path, 'utf8')
			this.$store.replaceState(merge(this.$store.state, JSON.parse(data)))
		}
	},
	data () {
		return {
			path: null
		}
	},
	beforeDestroy () { clearInterval(this.$options.interval) }
}
</script>
