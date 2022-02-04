export default {
    namespaced: true,

    state: {
        email: '',
        firstName: '',
        fullName: '',
        lastName: '',
        token: '',
    },

    mutations: {
        async set(state, {
            email,
            first_name: firstName,
            full_name: fullName,
            last_name: lastName,
            token,
        }) {
            state.email = email;
            state.firstName = firstName;
            state.fullName = fullName;
            state.lastName = lastName;
            state.token = token;

            return state;
        },
        
        async remove(state, {
            email,
            firstName,
            fullName,
            lastName,
            token,
        }) {
            state.email = email;
            state.firstName = firstName;
            state.fullName = fullName;
            state.lastName = lastName;
            state.token = token;

            return state;
        },
    },

    actions: {
        set({ commit }, payload) {
            commit('set', payload);
        },

        remove({ commit }) {
            commit('remove', {
                email: '',
                firstName: '',
                fullName: '',
                lastName: '',
                token: '',
            });
        },
    },
};
