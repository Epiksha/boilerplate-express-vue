export const capitalize = ([first, ...rest]) => first.toUpperCase() + rest.join('');

export const copyToClipboard = text => {
    const element = document.createElement('textarea');

    element.value = text;
    element.setAttribute('readonly', '');
    element.style.position = 'absolute';
    element.style.left = '-9999px';
    document.body.appendChild(element);

    element.select();
    document.execCommand('copy');

    document.body.removeChild(element);
};

export const pad = number => number > 9 ? `${number}` : `0${number}`;

export const formatTime = timeInSeconds => {
    const hours = Math.floor(timeInSeconds / 3600);
    const minutes = Math.floor((timeInSeconds % 3600) / 60);
    const seconds = Math.floor(timeInSeconds % 60);

    if (hours) {
        return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
    }
    
    if (minutes) {
        return `${pad(minutes)}:${pad(seconds)}`;
    }

    return `00:${pad(seconds)}`;
};

export const htmlToText = html => {
    const tempElement = document.createElement('textarea');
    
    tempElement.innerHTML = html;

    return tempElement.childNodes.length === 0 ? '' : tempElement.childNodes[0].nodeValue;
};

export default {
    install(Vue) {
        const utility = {
            capitalize,
            copyToClipboard,
            formatTime,
            htmlToText,
            pad,
        };

        Vue.$utility = utility;
        Vue.prototype.$utility = utility;
    },
};
