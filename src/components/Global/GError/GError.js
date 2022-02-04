import { arrayValidator } from 'vue-props-validation';

export default {
    props: {
        errors: {
            required: true,
            type: Array,
            validator: arrayValidator(String),
        },
    },
};
