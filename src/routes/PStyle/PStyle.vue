<template>
    <div class="styleguide container py-4">
        <h1>Styleguide</h1>
        
        <!-- Buttons -->
        <section class="styleguide__buttons">
            <h2>Buttons</h2>

            <div>
                <button>Submit</button>

                <button class="button button--secondary">
                    Submit
                </button>
                
                <router-link
                    to="/styleguide"
                    class="button"
                >
                    Link with button class
                </router-link>
                
                <router-link
                    to="/styleguide"
                    class="mx-2"
                >
                    Default Link
                </router-link>
            </div>
        </section>

        <!-- Inputs -->
        <section class="styleguide__inputs">
            <h2>Inputs</h2>

            <GCheckboxGroup
                id="checkbox-group-1"
                :items="checkboxes"
                label="Checkbox Group (Default)"
                class="mt-4"
            />
            
            <GCheckboxGroup
                id="checkbox-group-2"
                :items="checkboxes"
                :is-vertical="true"
                label="Checkbox Group (Vertical)"
                class="mt-4"
            />

            <h3 class="mt-4 mb">
                Radio Group (Default)
            </h3>

            <GRadioGroup
                id="radio-group-1"
                :radios="radios"
            />

            <h3 class="mt-4 mb">
                Radio Group (Vertical)
            </h3>
            
            <GRadioGroup
                id="radio-group-2"
                :radios="radios"
                :is-vertical="true"
            />

            <h3 class="mt-4">
                Range Slider (Default)
            </h3>
            
            <GRange
                v-model="rangeValue"
                aria-label="Styleguide Example Range Slider 1"
            />
            
            <h3 class="mt-4">
                Range Slider (No labels and permanent tooltip)
            </h3>

            <GRange
                v-model="rangeValue"
                aria-label="Styleguide Example Range Slider 2"
                :is-labelled="false"
                :tooltip="{ isPermanent: true }"
            />
            
            <h3 class="my-4">
                Range Slider (No labels/tooltip, color change)
            </h3>

            <GRange
                v-model="rangeValue"
                aria-label="Styleguide Example Range Slider 3"
                :is-labelled="false"
                :is-tooltipped="false"
                :colors="{ progress: 'orange', track: '#cccccc' }"
            />

            <h3 class="mt-4">
                Email
            </h3>

            <GInput
                id="styleguide-email"
                v-model="email"
                class="mt"
                label="Your Email:"
                type="email"
                placeholder="Email"
                :required="true"
            />

            <h3 class="mt-4">
                Password
            </h3>
                
            <GInput
                id="styleguide-password"
                v-model="password"
                class="mt"
                label="Your Password:"
                type="password"
                placeholder="Password"
                :required="true"
            />
            
            <h3 class="mt-4">
                Text
            </h3>
                
            <GInput
                id="styleguide-text"
                v-model="text"
                class="mt"
                label="Your Text:"
                type="text"
                placeholder="Text"
                :required="true"
            />
        </section>

        <!-- Typography -->
        <section class="styleguide__typography">
            <h2>Typography</h2>

            <h1>Heading 1 (h1)</h1>
            <h2>Heading 2 (h2)</h2>
            <h3>Heading 3 (h3)</h3>
            <h4>Heading 4 (h4)</h4>
            <h5>Heading 5 (h5)</h5>
            <h6>Heading 6 (h6)</h6>
        </section>
        
        <!-- Video Player -->
        <section class="styleguide__videoPlayer">
            <h2>Video Player</h2>

            <GVideoPlayer
                id="example-video-player"
                aria-label="Styleguide Example Video Player"
                src="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
                :poster="{ name: 'big-buck-bunny-thumbnail.webp' }"
                :subtitles="[
                    { kind: 'subtitles', label: 'English', name: 'example_en.vtt', srclang: 'en' },
                    { kind: 'subtitles', label: 'German', name: 'example_de.vtt', srclang: 'de' },
                ]"
            />
        </section>
    </div>
</template>

<script src="./PStyle" />
