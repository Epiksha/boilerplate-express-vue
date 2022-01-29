export default {
    props: {
        max: {
            default: 100,
            type: Number,
        },
        min: {
            default: 0,
            type: Number,
        },
        step: {
            default: 1,
            type: Number,
        },
        value: {
            required: true,
            type: [Number, String],
        },
    },

    methods: {
        emitInput(event) {
            this.$emit('input', +event.target.value);
        },
    },

    computed: {
        backgroundImage() {
            const { value } = this;

            return `linear-gradient(to right, #5ac09e ${-100 + value}% ${value}%, #eee ${value}% ${100 + value}%)`;
        },
    },
};
