import { arrayValidator, objectValidator } from 'vue-props-validation';

export default {
    props: {
        ariaLabel: String,
        colors: {
            type: Object,
            default: () => ({
                progress: '#5ac09e',
                track: '#eeeeee',
            }),
            validator: objectValidator({
                progress: String,
                track: String,
            }),
        },
        id: String,
        isLabelled: { type: Boolean, default: true },
        isTooltipped: { type: Boolean, default: true },
        labels: {
            type: Array,
            validator: arrayValidator({
                type: Object,
                validator: objectValidator({ type: String, text: String }),
            }),
        },
        max: { default: 100, type: Number },
        min: { default: 0, type: Number },
        step: { default: 1, type: Number },
        tooltip: {
            type: Object,
            validator: objectValidator({
                isPermanent: { type: Boolean, required: false },
                isCustom: { type: Boolean, required: false },
                value: { type: [Number, String], required: false },
            }),
        },
        value: { required: true, type: [Number, String] },
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

        handleMousedown() {
            this.$emit('mousedown');
        },
        
        handleMouseup() {
            this.$emit('mouseup');
        },

        toggleTooltip() {
            if (this.isTooltipped && (!this.tooltip || !this.tooltip.isPermanent)) {
                this.isTooltipActive = !this.isTooltipActive;
            }
        },
    },

    computed: {
        backgroundImage() {
            const halfThumbWidthREM = 0.75;
            const { progress, track } = this.colors;

            return `linear-gradient(
                to right,
                ${progress} -${100 + this.percentage}% calc(${this.percentage}% + ${halfThumbWidthREM}rem),
                ${track} calc(${this.percentage}% + ${halfThumbWidthREM}rem) ${100 + this.percentage}%
            )`;
        },

        endLabel() {
            if (this.labels) {
                return this.labels.find(label => label.type === 'end').text;
            }
        },

        percentage() {
            const range = this.max - this.min;

            return +((this.value / range) * 100);
        },

        startLabel() {
            if (this.labels) {
                return this.labels.find(label => label.type === 'start').text;
            }
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
