import PIndex from '../routes/PIndex/PIndex.vue';
import PLogin from '../routes/PLogin/PLogin.vue';
import PMembers from '../routes/PMembers/PMembers.vue';
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
        path: '/styleguide',
        component: PStyle,
    },
];
