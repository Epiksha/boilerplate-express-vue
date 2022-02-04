export default {
    props: {
        alt: {
            type: String,
            required: false,
        },
        external: {
            type: Boolean,
            default: false,
        },
        name: {
            type: String,
            required: true,
        },
    },

    computed: {
        image() {
            if (!this.external && this.name) {
                const imageFiles = require.context('../../../assets/images', false, /\.(gif|png|jpe?g|svg|webp)$/);

                return imageFiles(imageFiles.keys().filter(image => image.replace('./', '') === this.name));
            }

            return this.name;
        },
    },
};
