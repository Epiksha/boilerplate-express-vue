import axios from 'axios';

export default {
    data: () => ({
        form: {
            email: '',
            password: '',
        },
        errors: {
            default: [],
            email: [],
            password: [],
        },
    }),

    methods: {
        async submit() {
            try {
                const { data } = await axios.post(`${process.env.API_URL}/auth/token`, this.form);
    
                this.$store.commit('user/set', data);
            } catch (error) {
                this.errors = error.response.data.errors;
            }
        },
    },
};
