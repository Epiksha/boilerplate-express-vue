<template>
    <div
        :id="id"
        ref="videoPlayer"
        class="videoPlayer"
        tabindex="0"
        @keyup.enter="togglePlay"
        @keyup.space="togglePlay"
        @keyup.left="() => changeTime(false)"
        @keyup.minus="() => changeTime(false)"
        @keyup.right="changeTime"
        @keyup.plus="changeTime"
        @fullscreenchange="handleFullscreenChange"
    >
        <div class="videoPlayer__wrapper">
            <ul
                v-if="controlSettings.subtitles && textTracks && textTracks.length"
                :id="`${id}-subtitles-tray`"
                class="videoPlayer__subtitles"
                :class="{'active': isSubtitlesTrayOpen}"
                :aria-hidden="!isSubtitlesTrayOpen"
                @mouseenter="handleSlideTrayEnter"
                @mouseleave="handleSlideTrayLeave"
            >
                <li>
                    <button
                        class="button button--subtitle"
                        :class="{'active': !areSubtitlesActive}"
                        aria-label="No Subtitles"
                        @click="() => toggleSubtitles()"
                    >
                        No Subtitles
                    </button>
                </li>

                <li
                    v-for="(track, index) in textTracks"
                    :key="track.srclang"
                >
                    <button
                        class="button button--subtitle"
                        :class="{'active': areSubtitlesActive && currentSubtitleIndex === index}"
                        :aria-label="`${track.label} Subtitles`"
                        @click="() => toggleSubtitles(index)"
                    >
                        {{ track.label ? track.label : track.srclang }}
                    </button>
                </li>
            </ul>

            <video
                ref="video"
                :aria-label="ariaLabel"
                :src="currentSource"
                :poster="loadedPoster"
                @pause="handlePause"
                @play="handlePlay"
                @click.prevent.self="togglePlay"
                @loadeddata="setVideoInfo"
                @timeupdate="handleTimeUpdate"
            >
                <GTrack 
                    v-for="subtitle in subtitles"
                    :key="subtitle.srclang"
                    v-bind="subtitle"
                />
            </video>

            <button
                class="button button--video button--bigPlay"
                :class="{'active': isBigPlayActive}"
                aria-label="Play Video"
                @click.self="togglePlay"
            >
                <GIcon
                    v-if="isPaused"
                    class="icon--video icon--play"
                    name="icon-play"
                />

                <GIcon
                    v-if="!isPaused"
                    class="icon--video icon--pause"
                    name="icon-pause"
                />
            </button>
        </div>

        <div
            v-if="controls"
            class="videoPlayer__controls"
        >
            <div class="videoPlayer__controls__inner">
                <button
                    class="button button--video"
                    :aria-label="`${isPaused ? 'Play' : 'Pause'} Video`"
                    @click="togglePlay"
                >
                    <GIcon
                        v-if="isPaused"
                        class="icon--video icon--play"
                        name="icon-play"
                    />
                    
                    <GIcon
                        v-if="!isPaused"
                        class="icon--video icon--pause"
                        name="icon-pause"
                    />
                </button>

                <div class="videoPlayer__track">
                    <GRange
                        :id="id ? `${id}-progress-slider` : ''"
                        v-model="progress"
                        :aria-label="`${ariaLabel} Progress Slider`"
                        class="range--video"
                        :is-tooltipped="false"
                        :step="0.01"
                        :labels="labels"
                        :increased-offset-value="0.75"
                        @mousedown="handleRangeMousedown"
                        @mouseup="handleRangeMouseup"
                    />
                </div>

                <div class="videoPlayer__options">
                    <button
                        v-if="controlSettings.fullscreen"
                        class="button button--video button--fullscreen"
                        aria-label="Fullscreen Video"
                        @click.prevent="toggleFullscreen"
                    >
                        <GIcon
                            v-if="isFullscreen"
                            class="icon--video icon--collapse"
                            name="icon-collapse"
                        />

                        <GIcon
                            v-if="!isFullscreen"
                            class="icon--video icon--expand"
                            name="icon-expand"
                        />
                    </button>
                    
                    <button
                        v-if="controlSettings.subtitles && textTracks && textTracks.length"
                        class="button button--video button--subtitles"
                        :class="{'active': isSubtitlesTrayOpen}"
                        aria-label="Subtitles Tray"
                        :aria-controls="`${id}-subtitles-tray`"
                        @click="toggleSubtitlesTray"
                    >
                        <GIcon
                            class="icon--video icon--captions"
                            name="icon-cc"
                        />
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script src="./GVideoPlayer" />
