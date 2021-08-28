<template>
	<div class="row">
		<div class="offset-3 col-6">
			<b-card>
				<form @submit.prevent="handleSubmit">
					<legend>Username</legend>
					<b-input v-model="username" type="text" />
					<legend>Password</legend>
					<b-input v-model="password" type="password" />
					<legend>Confirm</legend>
					<b-input v-model="confirm" type="password" />
					<br />
					<b-button @click="handleSubmit">Submit</b-button>
				</form>
			</b-card>
		</div>
	</div>
</template>

<script>
	import { mapActions } from 'vuex'

	import { signUp } from '@/api/user'

	export default {
		data() {
			return {
				username: "",
				password: "",
				confirm: "",
			}
		},
		methods: {
			...mapActions({
				'setUser': 'setUser'
			}),
			handleSubmit() {
				if (this.username.length == 0) {
					return;
				}
				if (this.password.length == 0) {
					return;
				}
				if (this.confirm.length == 0) {
					return;
				}
				if (this.password !== this.confirm) {
					return;
				}
				signUp(this.username, this.password).then((rsp) => {
					this.setUser(rsp.data.user);
					localStorage.setItem('token', rsp.data.user.token);
					this.$router.push("/");
				});
			}
		},
	}
</script>

<style>
</style>
