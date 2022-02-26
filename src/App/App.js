import VHeader from '../components/VHeader/VHeader.vue';
import '../assets/favicon.ico';

export default {
    components: {
        VHeader,
    },

    watch: {
        $route() {
            if (!this.$store.state.user.token && this.$route.meta.isGated) {
                this.$router.push('/login');
            }
        },
    },
};
