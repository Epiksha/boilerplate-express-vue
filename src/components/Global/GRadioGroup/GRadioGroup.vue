<template>
    <form
        :id="id"
        class="radioGroup"
        :class="{'radioGroup--vertical': isVertical}"
    >
        <label
            v-for="(radio, index) in radios"
            :key="index"
            class="radio"
        >
            <input
                v-model="current"
                :aria-labelledby="`${id}-radio-${index + 1}`"
                type="radio"
                :name="id"
                class="input input--radio"
                :value="radio.label"
            >

            <div class="radio__circle"></div>
            
            <span
                :id="`${id}-radio-${index + 1}`"
                :for="radio.id"
                class="radio__text"
                v-text="radio.label"
            />
        </label>
    </form>
</template>

<script src="./GRadioGroup" />
