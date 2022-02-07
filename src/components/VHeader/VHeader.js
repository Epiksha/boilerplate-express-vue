export default {
    data() {
        return {
            isNavActive: false,
            disableTransitions: false,
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
            deactiveRoutes: ['/login', '/register'],
            timeout: null,
        };
    },

    methods: {
        closeNavigation(event) {
            if (
                this.isNavActive
                && (event.target !== this.$refs.hamburger && !this.$refs.hamburger.contains(event.target))
            ) {
                this.isNavActive = false;
            }
        },

        handleViewportResize() {
            if (window.innerWidth > 767) {
                this.isNavActive = false;
            } else if (!this.timeout) {
                clearTimeout(this.timeout);
                this.disableTransitions = true;

                this.timeout = setTimeout(() => {
                    this.disableTransitions = false;
                    this.timeout = null;
                }, 200);
            }
        },

        toggleNavigation() {
            this.isNavActive = !this.isNavActive;
        },
    },

    computed: {
        token() {
            return this.$store.state.user.token;
        },
    },

    mounted() {
        window.addEventListener('resize', this.handleViewportResize);
    },

    beforeDestroy() {
        clearTimeout(this.timeout);
        window.removeEventListener('resize', this.handleViewportResize);
    },
};
