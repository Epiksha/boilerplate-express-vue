<template>
    <div class="styleguide container py-4">
        <router-link
            to="/"
        >
            Home
        </router-link>

        <!-- Buttons -->
        <section class="styleguide__buttons">
            <h2>Buttons</h2>

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
        </section>

        <!-- Inputs -->
        <section class="styleguide__typography">
            <h2>Inputs</h2>

            <h3>Range Slider (Default)</h3>
            
            <GRange
                v-model="rangeValue"
            />
            
            <h3 class="mt-4">
                Range Slider (No labels and permanent tooltip)
            </h3>

            <GRange
                v-model="rangeValue"
                :is-labelled="false"
                :tooltip="{ isPermanent: true }"
            />
            
            <h3 class="my-4">
                Range Slider (No labels and no tooltip)
            </h3>

            <GRange
                v-model="rangeValue"
                :is-labelled="false"
                :is-tooltipped="false"
            />

            <GCheckboxGroup
                :items="checkboxes"
                label="Checkbox Group (Default)"
                class="mt-4"
            />
            
            <GCheckboxGroup
                :items="checkboxes"
                :is-vertical="true"
                label="Checkbox Group (Vertical)"
                class="mt-4"
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
    </div>
</template>

<script src="./PStyle" />
