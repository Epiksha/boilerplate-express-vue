export default {
    data() {
        return {
            navLinks: [
                {
                    isGated: false,
                    text: 'Login',
                    url: '/login',
                },
                {
                    callback: async () => {
                        await this.$store.dispatch('user/remove');
                        this.$router.push('/');
                    },
                    context: this,
                    isGated: true,
                    text: 'Logout',
                    url: '/logout',
                },
                {
                    isGated: true,
                    text: 'Members',
                    url: '/members',
                },
            ],
        };
    },

    computed: {
        token() {
            return this.$store.state.user.token;
        },
    },
};
