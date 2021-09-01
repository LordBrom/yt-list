<template>
	<div class="row baseRow">
		<div class="col-12">
			<b-card>
				<form @submit.prevent="handleSubmit">
					<h3>Change Password</h3>
					{{msg}}
					<legend>Current Password</legend>
					<b-input v-model="oldPassword" type="password" :state="('oldPassword' in errors ? false : null)" />
					<b-form-invalid-feedback id="input-live-feedback">
						{{ errors.oldPassword }}
					</b-form-invalid-feedback>
					<legend>New Password</legend>
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
	import { changePassword } from '@/api/user'

	export default {
		data() {
			return {
				oldPassword: "",
				password: "",
				confirm: "",
				errors: {},
				msg: "",
			}
		},
		methods: {

			handleSubmit() {
				this.errors = {};
				this.msg = null;

				if (this.oldPassword.length == 0) {
					this.errors.oldPassword = 'is required';
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
				changePassword(this.oldPassword, this.password)
				.then(() => {
					this.msg = "Success";
					this.oldPassword = "";
					this.password = "";
					this.confirm = "";
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
