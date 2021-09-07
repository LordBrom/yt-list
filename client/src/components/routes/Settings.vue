<template>
	<div>
		<manager></manager>
		<change-password></change-password>
	</div>
</template>

<script>
	import Manager from '@/components/ViewManager'
	import ChangePassword from '@/components/ChangePassword'

	export default {
		name: 'Settings',
		components: {
			Manager,
			ChangePassword,
		}
	}
</script>
