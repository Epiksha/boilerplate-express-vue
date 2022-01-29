import Vue from 'vue';

import directives from './libs/directives';
import plugins from './libs/plugins';
import router from './libs/router';
import store from './libs/store';
import App from './App/App.vue';

// Import SASS
import './scss/entry.scss';

// Imports SVGs so webpack loaders generate spritesheet
const svgs = require.context('./assets/icons/', true, /\.svg$/);
svgs.keys().forEach(svgs);

// Register global components
const globals = ['GCheckbox', 'GCheckboxGroup', 'GIcon', 'GImage', 'GInput', 'GRadios', 'GRange', 'GSpinner'];

globals.forEach(component => {
    Vue.component(component, require(`./components/Global/${component}/${component}.vue`).default);
});

// Plugins & Directives
plugins.forEach(plugin => Vue.use(plugin));
directives.forEach(directive => Vue.directive(directive.name, directive.config));

// Setup Vue instance
new Vue({
    render: (createEl) => createEl(App),
    router,
    store,
}).$mount('#root');

// Remove nojs class since JS is active
document.querySelector('.nojs').classList.remove('nojs');
