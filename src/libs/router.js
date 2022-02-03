import Vue from 'vue';
import VueRouter from 'vue-router';

import routes from './routes';
import store from './store';

Vue.use(VueRouter);

const router = new VueRouter({
    linkExactActiveClass: 'active',
    routes,
});

router.beforeEach((to, from, next) => {
    const { token: isAuthenticated } = store.state.user;

    if (to.fullPath === '/login' && isAuthenticated) {
        next('/');
    }

    if (to.meta.isGated && !isAuthenticated) {
        next('/login');
    }

    next();
});

export default router;
