import Vue from 'vue'
import Router from 'vue-router'

import Dashboard from '@/components/routes/Dashboard'
import Login from '@/components/routes/Login'
import SignUp from '@/components/routes/SignUp'

Vue.use(Router);

export default new Router({
	mode: 'history',
	routes: [
		{
			path: "/",
			component: Dashboard
		},
		{
			path: "/login",
			component: Login
		},
		{
			path: "/signup",
			component: SignUp
		},
	]
})
