<template>
	<div class="card bg-light p-3 mb-3">
		<label>Display</label>
		<div class="input-group">
			<select  class="custom-select" v-model="selectedDisplay" :disabled="win">
				<option v-for="(d, i) in displays" :key="d.id" :value="d.id">{{'Display ' + (i + 1) + ' [' + d.size.width + 'x' + d.size.height + ']'}}</option>
			</select>
			<div class="input-group-append">
				<button type="button" :class="'btn btn-'+(win?'info':'primary')" @click="toggleDisplay">{{win ? 'Close' : 'Open'}}</button>
			</div>
		</div>
	</div>
</template>

<script>
import { screen, ipcRenderer, remote } from 'electron'
export default {
	created () {
		this.displays = screen.getAllDisplays()
		console.log(JSON.stringify(this.displays, null, 4))
	},
	methods: {
		getTargetPos(){
			const found = this.displays.find(d => {
				return d.id === this.selectedDisplay
			})
			if (typeof found !== 'undefined')
				return found.bounds
		},
		toggleDisplay () {
			if (this.win && !this.win.isDestroyed()) {
				this.win.destroy()
				this.win = null
			} else if (this.selectedDisplay) {
				this.win = new remote.BrowserWindow({
					width: this.getTargetPos().width,
					height: this.getTargetPos().height,
					frame: false,
					x: this.getTargetPos().x,
					y: this.getTargetPos().y,
					alwaysOnTop: true,
					skipTaskbar: true,
					resizable: false,
					movable: false,
					minimizable: false,
					maximizable: false,
					fullscreen: true,
					show: false
				})
				this.win.loadURL(window.location.href + 'display')
				this.win.once('ready-to-show', () => {
					this.win.show()
				})
			}
		}
	},
	data () {
		return {
			displays: null,
			win: null,
			selectedDisplay: null
		}
	},
	beforeDestroy () {
		if (this.win) { this.win.destroy(); this.win = null }
	}
}
</script>
