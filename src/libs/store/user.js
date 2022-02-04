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
        async set(state, { property, value }) {
            state[property] = value;
        },
        
        async remove(state) {
            state.email = '';
            state.name = '';
            state.token = '';
        },
    },

    actions: {
        set({ commit }, {
            email,
            first_name: firstName,
            full_name: fullName,
            last_name: lastName,
            token,
        }) {
            if (firstName !== null && firstName !== undefined) {
                commit('set', { property: 'firstName', value: firstName });
            }
            
            if (fullName !== null && fullName !== undefined) {
                commit('set', { property: 'fullName', value: fullName });
            }

            if (token !== null && token !== undefined) {
                commit('set', { property: 'token', value: token });
            }
            
            if (lastName !== null && lastName !== undefined) {
                commit('set', { property: 'lastName', value: lastName });
            }
            
            if (email !== null && email !== undefined) {
                commit('set', { property: 'email', value: email });
            }
        },

        remove({ commit }) {
            commit('remove');
        },
    },
};
