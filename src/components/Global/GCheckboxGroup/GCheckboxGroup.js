import { arrayValidator } from 'vue-props-validation';

export default {
    props: {
        label: String,
        isVertical: {
            default: false,
            type: Boolean,
        },
        items: {
            type: Array,
            validator: arrayValidator({
                label: {
                    type: String,
                    required: false,
                },
                isSelected: {
                    type: Boolean,
                    required: true,
                },
            }),
        },
    },
};
