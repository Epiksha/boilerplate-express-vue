import PIndex from '../routes/PIndex/PIndex.vue';
import PLogin from '../routes/PLogin/PLogin.vue';
import PMembers from '../routes/PMembers/PMembers.vue';
import PRegister from '../routes/PRegister/PRegister.vue';
import PStyle from '../routes/PStyle/PStyle.vue';

export default [
    {
        path: '/',
        component: PIndex,
    },
    {
        path: '/login',
        component: PLogin,
    },
    {
        path: '/members',
        component: PMembers,
        meta: {
            isGated: true,
        },
    },
    {
        path: '/register',
        component: PRegister,
    },
    {
        path: '/styleguide',
        component: PStyle,
    },
];
