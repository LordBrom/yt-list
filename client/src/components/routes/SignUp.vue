<template>
	<div class="row">
		<div class="offset-md-3 col-12 col-md-6 mt-5 mb-5">
			<b-card>
				<form @submit.prevent="handleSubmit">
					<h1>Sign Up</h1>
					{{msg}}
					<legend>Username</legend>
					<b-input v-model="username" type="text" :state="('email' in errors ? false : null)" />
					<b-form-invalid-feedback id="input-live-feedback">
						{{ errors.email }}
					</b-form-invalid-feedback>
					<legend>Password</legend>
					<b-input v-model="password" type="password" :state="('password' in errors ? false : null)" />
					<b-form-invalid-feedback id="input-live-feedback">
						{{ errors.password }}
					</b-form-invalid-feedback>
					<legend>Confirm</legend>
					<b-input v-model="confirm" type="password" :state="('confirm' in errors ? false : null)" />
					<b-form-invalid-feedback id="input-live-feedback">
						{{ errors.confirm }}
					</b-form-invalid-feedback>
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
		name: 'SignUp',
		data() {
			return {
				username: "",
				password: "",
				confirm: "",
				errors: {},
				msg: null,
			}
		},
		methods: {
			...mapActions({
				'setUser': 'setUser'
			}),
			handleSubmit() {
				this.errors = {};
				this.msg = null;

				if (this.username.length == 0) {
					this.errors.email = 'is required';
				}
				if (this.password.length == 0) {
					this.errors.password = 'is required';
				}
				if (this.confirm.length == 0) {
					this.errors.confirm = 'is required';
				}
				if (this.password !== this.confirm) {
					this.errors.confirm = 'doesn\'t match';
				}
				if (Object.keys(this.errors).length !== 0) {
					return;
				}
				signUp(this.username, this.password)
				.then((rsp) => {
					this.setUser(rsp.data.user);
					this.$router.push("/");
				})
				.catch(err => {
					switch (err.response.status) {
						case 500:
							this.msg = "Somthin fucked up"
							break;

						case 422:
							this.errors = err.response.data.errors;
							break;

						default:
							break;
					}
				});
			}
		},
	}
</script>

<style>
</style>
