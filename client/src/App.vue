<template>
	<div id="app">
		<nav class="navbar navbar-expand navbar-light fixed-top bg-light">
			<div class="container-fluid">
				<router-link to="/" class="navbar-brand">Hello</router-link>
				<div class="collapse navbar-collapse">
					<ul v-if="!user" class="navbar-nav ml-auto">
						<li class="nav-item">
							<router-link to="login" class="nav-link">Login</router-link>
						</li>
						<li class="nav-item">
							<router-link to="signup" class="nav-link">Sign Up</router-link>
						</li>
					</ul>
					<ul v-else class="navbar-nav ml-auto">
						<li class="nav-item">
							<router-link to="settings" class="nav-link">Settings</router-link>
						</li>
						<li class="nav-item">
							<a href="javascript:void(0);" @click="handleLogout" class="nav-link">Logout</a>
						</li>
					</ul>
				</div>
			</div>
		</nav>
		<div class="container-fluid">
			<router-view></router-view>
		</div>
	</div>
</template>

<script>
	import { mapGetters, mapActions } from 'vuex'

	import { getCurrent } from '@/api/user'

	export default {
		name: 'App',
		methods: {
			...mapActions({
				'setUser': 'setUser',
				'clearUser': 'clearUser',
				'toggleShowManager': 'toggleShowManager',
			}),
			async handleLogout() {
				await this.clearUser();
				this.$router.push("/login");
			}
		},
		computed: {
			...mapGetters({
				'user': 'getUser'
			}),
		},
		async created() {
			await getCurrent().then(async (rsp) => {
				const user = rsp.data.user;
				await this.setUser(user);
			});
		},
	}
</script>

<style>
	body { padding-top: 56px; }

	#app {
		background-color: #1d1d1d;
	}

	.baseRow {
		margin-bottom: 0.5rem;
		padding: 0.5rem 0;
	}
</style>
