<template>
    <input
        :value="value"
        type="range"
        :min="min"
        :max="max"
        :step="step"
        :style="{backgroundImage}"
        :aria-valuemin="min"
        :aria-valuemax="max"
        :aria-valuenow="value"
        @input="({ target }) => $emit('input', +target.value)"
    >
</template>

<script src="./GRange" />
