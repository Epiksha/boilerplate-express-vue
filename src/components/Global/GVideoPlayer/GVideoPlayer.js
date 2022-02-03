import { arrayValidator, objectValidator } from 'vue-props-validation';

export default {
    props: {
        ariaLabel: String,
        controls: {
            type: Boolean,
            default: true,
        },
        controlSettings: {
            default: () => ({
                fullscreen: true,
                subtitles: true,
            }),
            validator: objectValidator({
                fullscreen: { type: Boolean },
                subtitles: { type: Boolean },
            }),
        },
        id: String,
        poster: {
            type: Object,
            required: false,
            validator: objectValidator({
                name: String,
                external: {
                    type: Boolean,
                    default: false,
                },
            }),
        },
        sources: {
            type: Array,
            required: false,
            validator: arrayValidator({ type: String }),
        },
        src: { type: String, required: false },
        subtitles: {
            type: Array,
            required: false,
            validator: arrayValidator({
                type: Object,
                validator: objectValidator({
                    external: { type: Boolean, default: false },
                    kind: String,
                    name: String,
                    srclang: String,
                }),
            }),
        },
    },

    data: () => ({
        areSubtitlesActive: false,
        clickCount: 0,
        currentTime: 0,
        currentSubtitleIndex: 0,
        duration: 0,
        isBigPlayActive: true,
        isFullscreen: false,
        isPaused: true,
        isProgressChanging: false,
        isSubtitlesTrayOpen: false,
        progress: 0,
        streamFile: {},
        textTracks: [],
        timeouts: {
            bigPlay: null,
            fullscreenDoubleClick: null,
            subtitlesTray: null,
        },
    }),

    methods: {
        changeTime(isForward = true) {
            this.isProgressChanging = true;
            let newTime = (this.progress / 100) * this.duration;

            if (isForward) {
                newTime = newTime + 5 > this.duration ? this.duration : newTime + 5;
            } else {
                newTime = newTime - 5 < 0 ? 0 : newTime - 5;
            }

            this.currentTime = newTime;
            this.$refs.video.currentTime = this.currentTime;
            this.isProgressChanging = false;
        },

        closeSubtitlesTray() {
            this.isSubtitlesTrayOpen = false;
            clearTimeout(this.timeouts.slideTray);
        },

        handleFullscreenChange() {
            this.isFullscreen = document.fullscreenElement !== null;
        },

        handlePlay() {
            this.isPaused = false;

            this.timeouts.bigPlay = setTimeout(() => {
                this.isBigPlayActive = false;
            }, 1000);
        },

        handlePause() {
            this.isPaused = true;
            this.isBigPlayActive = true;
            clearTimeout(this.timeouts.bigPlay);
        },

        handleRangeMousedown() {
            this.isProgressChanging = true;
        },
        
        handleRangeMouseup() {
            this.currentTime = (this.progress / 100) * this.duration;
            this.$refs.video.currentTime = this.currentTime;
            this.isProgressChanging = false;
        },

        handleSlideTrayLeave() {
            this.timeouts.slideTray = setTimeout(this.closeSubtitlesTray, 3000);
        },

        handleSlideTrayEnter() {
            clearTimeout(this.timeouts.slideTray);
        },

        handleTimeUpdate() {
            if (!this.isProgressChanging) {
                this.updateProgress();
            }
        },

        openSubtitlesTray() {
            this.isSubtitlesTrayOpen = true;

            clearTimeout(this.timeouts.slideTray);
            this.timeouts.slideTray = setTimeout(this.closeSubtitlesTray, 10000);
        },

        pause() {
            this.$refs.video.pause();
        },
        
        play() {
            this.$refs.video.play();
        },

        setVideoInfo() {
            this.duration = this.$refs.video.duration;
            this.updateProgress();
        },

        toggleFullscreen() {
            if (document.fullscreenElement === null) {
                this.$refs.videoPlayer.requestFullscreen();
            } else {
                document.exitFullscreen();
            }
        },

        togglePlay() {
            this.clickCount++;

            if (this.clickCount === 1) {
                this[this.isPaused ? 'play' : 'pause']();

                this.timeouts.fullscreenDoubleClick = setTimeout(() => {
                    this.clickCount = 0;
                }, 200);
            } else {
                clearTimeout(this.timeouts.fullscreenDoubleClick);  
                this.toggleFullscreen();
                this.clickCount = 0;
                this[this.isPaused ? 'play' : 'pause']();
            }
        },

        toggleSubtitles(index = null) {
            this.textTracks.forEach(textTrack => {
                textTrack.mode = 'disabled';
            });

            if (index === null) {
                this.areSubtitlesActive = false;
                return;
            }

            this.currentSubtitleIndex = index;
            this.textTracks[this.currentSubtitleIndex].mode = 'showing';
            this.areSubtitlesActive = true;
        },

        toggleSubtitlesTray() {
            this[`${this.isSubtitlesTrayOpen ? 'close' : 'open'}SubtitlesTray`]();
        },

        updateProgress() {
            this.currentTime = this.$refs.video.currentTime;
            this.progress = (this.currentTime / this.duration) * 100;
        },
    },

    computed: {
        currentSource() {
            if (this.src) {
                if (this.src.indexOf('m3u8') > -1) {
                    this.streamFile = this.src;
                }

                return this.src;
            }

            if (this.sources && this.sources.length) {
                const streamFile = this.sources.find(source => source.indexOf('m3u8'));
    
                if (this.streamFile) {
                    this.streamFile = streamFile;
                    return streamFile;
                }

                return this.sources;
            }
        },

        labels() {
            if (this.currentTime !== undefined && this.duration !== undefined) {
                return [
                    {
                        type: 'start',
                        text: this.$utility.formatTime(this.currentTime),
                    },
                    {
                        type: 'end',
                        text: this.$utility.formatTime(this.duration),
                    },
                ];
            }
        },

        loadedPoster() {
            if (!this.poster.external && this.poster.name) {
                const imageFiles = require.context('../../../assets/images', false, /\.(gif|png|jpe?g|svg|webp)$/);

                return imageFiles(imageFiles.keys().filter(image => image.replace('./', '') === this.poster.name));
            }

            return this.name;
        },
    },

    mounted() {
        const { textTracks } = this.$refs.video;
        this.textTracks = [].slice.call(textTracks);
    },

    beforeDestroy() {
        Object.keys(this.timeouts).forEach(key => {
            clearTimeout(this.timeouts[key]);
        });
    },
};
