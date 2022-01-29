export default {
    install(Vue) {
        const eventBus = new Vue();
        
        Vue.$bus = eventBus;
        Vue.prototype.$bus = eventBus;
    },
};
