<template>
	<div class="card bg-light p-3 mb-3">
		<label>Display</label>
		<div class="input-group">
			<select class="custom-select pointer" v-model="selectedDisplay" :disabled="win">
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
	},
	methods: {
		getTargetPos(){
			const found = this.displays.find(d => { return d.id === this.selectedDisplay })
			if (typeof found !== 'undefined') { return found.bounds }
		},
		toggleDisplay () {
			if (this.win && !this.win.isDestroyed()) {
				this.closeWin()
			} else if (this.selectedDisplay !== null) {
				this.win = new remote.BrowserWindow({
					minWidth: this.getTargetPos().width,
					width: this.getTargetPos().width,
					minHeight: this.getTargetPos().height,
					height: this.getTargetPos().height,
					frame: false,
					x: this.getTargetPos().x,
					y: this.getTargetPos().y,
					alwaysOnTop: true,
					skipTaskbar: true,
					movable: false,
					minimizable: false,
					show: false,
					kiosk: true
				})
				this.win.loadURL(this.baseRoute + 'display')
				this.win.once('ready-to-show', () => { this.win.show() })
				this.win.on('closed', () => { this.closeWin() })
			}
		},
		closeWin () { if (this.win) { this.win.destroy(); this.win = null } }
	},
	data () {
		return {
			displays: null,
			win: null,
			selectedDisplay: null
		}
	},
	beforeDestroy () { this.closeWin() }
}
</script>
