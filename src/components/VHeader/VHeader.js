export default {
    data: () => ({
        navLinks: [
            {
                text: 'Login',
                url: '/login',
                gated: false,
            },
            {
                text: 'Logout',
                url: '/logout',
                gated: true,
            },
            {
                text: 'Members',
                url: '/members',
                gated: true,
            },
        ],
    }),

    computed: {
        token() {
            return this.$store.state.user.token;
        },
    },
};
