import { arrayValidator, objectValidator } from 'vue-props-validation';

export default {
    props: {
        id: String,
        isVertical: {
            type: Boolean,
            default: false,
        },
        radios: {
            type: Array,
            validator: arrayValidator({
                type: Object,
                validator: objectValidator({
                    id: { type: String, required: false },
                    isSelected: { type: Boolean },
                    label: { type: String, required: false },
                }),
            }),
        },
    },

    data() {
        return {
            current: this.radios[0].label,
        };
    },
};
