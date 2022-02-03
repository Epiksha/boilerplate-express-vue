<template>
    <label
        :id="id"
        class="checkbox"
    >
        <input
            :id="`${id}-input`"
            type="checkbox"
            :checked="isSelected"
            class="input input--checkbox"
            :aria-labelledby="`${id}-label`"
        >

        <GIcon
            class="icon--checkbox"
            name="icon-tick"
        />

        <span
            v-if="label"
            :id="`${id}-label`"
            class="checkbox__text"
            v-text="label"
        />
    </label>
</template>

<script src="./GCheckbox" />
