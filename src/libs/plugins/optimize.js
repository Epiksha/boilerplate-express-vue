export const debounce = (callback, delay = 250) => {
    let timer = null;

    return () => {
        clearTimeout(timer);

        timer = setTimeout(callback, delay);
    };
};

export const throttle = (callback, isThrottled, delay = 250) => {
    if (isThrottled) {
        return;
    }

    isThrottled = true;

    setTimeout(() => {
        callback();

        isThrottled = false;
    }, delay);
};

export default {
    install(Vue) {
        const optimize = {
            debounce,
            throttle,
        };
        
        Vue.$optimize = optimize;
        Vue.prototype.$optimize = optimize;
    },
};
