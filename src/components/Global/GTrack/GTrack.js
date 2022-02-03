export default {
    props: {
        external: {
            type: Boolean,
            default: false,
        },
        kind: {
            type: String,
            default: 'subtitles',
        },
        label: {
            type: String,
            required: false,
        },
        name: {
            type: String,
            required: true,
        },
        srclang: {
            type: String,
            required: false,
        },
    },

    computed: {
        subtitle() {
            if (!this.external && this.name) {
                const subtitleFiles = require.context('../../../assets/subtitles', false, /\.(vtt)$/);

                return subtitleFiles(subtitleFiles.keys().filter(subtitle => subtitle.replace('./', '') === this.name));
            }

            return this.name;
        },
    },
};
