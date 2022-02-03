import Vue from 'vue';
import { setConfig } from 'vue-props-validation';

import App from './App/App.vue';
import directives from './libs/directives';
import keyCodes from './libs/keyCodes';
import plugins from './libs/plugins';
import router from './libs/router';
import store from './libs/store';

// Import SASS
import './scss/entry.scss';

// Imports SVGs so webpack loaders generate spritesheet
const svgs = require.context('./assets/icons/', true, /\.svg$/);
svgs.keys().forEach(svgs);

// Register global components
const globals = ['GCheckbox', 'GCheckboxGroup', 'GIcon', 'GImage', 'GInput', 'GRadioGroup', 'GRange', 'GSpinner', 'GTrack', 'GVideoPlayer'];

globals.forEach(component => {
    Vue.component(component, require(`./components/Global/${component}/${component}.vue`).default);
});

// Plugins, Directives & Keycodes
plugins.forEach(plugin => Vue.use(plugin));
directives.forEach(directive => Vue.directive(directive.name, directive.config));
Vue.config.keyCodes = keyCodes;

// Prop Validation
setConfig({ enabled: process.env.NODE_ENV !== 'production' });

// Setup Vue instance
new Vue({
    render: (createEl) => createEl(App),
    router,
    store,
}).$mount('#root');

// Remove nojs class since JS is active
document.querySelector('.nojs').classList.remove('nojs');
