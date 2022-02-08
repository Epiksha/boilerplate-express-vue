import axios from 'axios';

export default {
    data: () => ({
        errors: {
            default: [],
            email: [],
            first_name: [],
            last_name: [],
            password: [],
        },
        form: {
            first_name: '',
            last_name: '',
            email: '',
            password: '',
        },
    }),

    watch: {
        form: {
            deep: true,
            handler() {
                this.errors = {
                    default: [],
                    email: [],
                    password: [],
                };
            },
        },
    },

    methods: {
        async submit() {
            try {
                const { data } = await axios.post(`${process.env.API_URL}/auth/token`, this.form);

                await this.$store.dispatch('user/set', data);
                
                this.$router.push('/members');
            } catch (error) {
                this.errors = error.response.data.errors;
            }
        },
    },
};
