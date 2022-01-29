import Vue from 'vue';
import VueX from 'vuex';
import VuexPersistedState from 'vuex-persistedstate';
import user from './store/user';

Vue.use(VueX);

export default new VueX.Store({
    plugins: [
        VuexPersistedState({ key: document.title }),
    ],

    modules: {
        user,
    },
});
