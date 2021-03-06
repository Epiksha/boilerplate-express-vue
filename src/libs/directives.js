export default [
    {
        name: 'clickaway',

        config: {
            bind(element, { expression }, { context }) {
                element.clickAwayEvent = event => {
                    if (!(element === event.target || element.contains(event.target))) {
                        // If expression is a method in the component, execute it
                        if (expression && typeof context[expression] === 'function') {
                            context[expression](event);
                        } else if (typeof expression === 'string') {
                            const key = expression.split(', ')[0];
                            let value = expression.split(', ').slice(1, expression.split(',').length).join();

                            if (value === 'true' || value === 'false') {
                                value = JSON.parse(value);
                            }

                            context[key] = value;
                        } else {
                            console.error('Invalid expression passed into v-clickaway event');
                        }
                    }
                };

                document.body.addEventListener('click', element.clickAwayEvent);
            },

            unbind(element) {
                document.body.removeEventListener('click', element.clickAwayEvent);
            },
        },
    },
];
