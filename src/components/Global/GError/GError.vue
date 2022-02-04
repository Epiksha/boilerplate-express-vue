<template>
    <div class="error">
        <span
            v-for="error in errors"
            :key="error"
            role="alert"
            v-text="error"
        />
    </div>
</template>

<script src="./GError" />
