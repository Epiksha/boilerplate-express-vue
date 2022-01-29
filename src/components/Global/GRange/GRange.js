import { objectValidator } from 'vue-props-validation';

export default {
    props: {
        isLabelled: {
            type: Boolean,
            default: true,
        },
        isTooltipped: {
            type: Boolean,
            default: true,
        },
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
        tooltip: {
            type: Object,
            validator: objectValidator({
                isPermanent: {
                    type: Boolean,
                    required: false,
                },
                isCustom: {
                    type: Boolean,
                    required: false,
                },
                value: {
                    type: [Number, String],
                    required: false,
                },
            }),
        },
        value: {
            required: true,
            type: [Number, String],
        },
    },

    data: () => ({
        isTooltipActive: false,
        tooltipPosition: 0,
    }),

    methods: {
        calculateTooltipPosition() {
            if (this.$refs.rangeInput) {
                const halfThumbWidth = 7.5;
                const rangeInputWidth = this.$refs.rangeInput.getBoundingClientRect().width;
                const range = this.max - this.min;
    
                const leftOffset = (((this.value - this.min) / range) * ((rangeInputWidth - halfThumbWidth) - halfThumbWidth)) + halfThumbWidth;
    
                this.tooltipPosition = leftOffset;
            }
        },

        emitInput(event) {
            this.$emit('input', +event.target.value);
        },

        toggleTooltip() {
            if (this.isTooltipped && (!this.tooltip || !this.tooltip.isPermanent)) {
                this.isTooltipActive = !this.isTooltipActive;
            }
        },
    },

    computed: {
        backgroundImage() {
            return `linear-gradient(
                to right,
                #5ac09e -${100 + this.percentage}% ${this.percentage}%,
                #eeeeee ${this.percentage}% ${100 + this.percentage}%
            )`;
        },

        percentage() {
            const range = this.max - this.min;

            return +((this.value / range) * 100);
        },
    },

    watch: {
        percentage() {
            this.calculateTooltipPosition();
        },
    },

    mounted() {
        this.calculateTooltipPosition();

        if (this.isTooltipped && this.tooltip && this.tooltip.isPermanent) {
            this.isTooltipActive = true;
        }
    },
};
