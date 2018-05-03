<template>
	<div></div>
</template>

<script>
export default {
	beforeCreate () {
		this.$router.push('/' + (this.$route.query.page || ''))
	}
}
</script>
