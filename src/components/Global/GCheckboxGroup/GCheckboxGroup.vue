<template>
    <div
        class="checkboxGroup"
        :class="{'checkboxGroup--vertical': isVertical}"
    >
        <h3
            v-if="label"
            class="checkboxGroup__label"
            v-text="label"
        />

        <ul class="checkboxGroup__list">
            <li
                v-for="(checkbox, index) in items"
                :key="index"
                class="checkboxGroup__item"
            >
                <GCheckbox v-bind="checkbox" />
            </li>
        </ul>
    </div>
</template>

<script src="./GCheckboxGroup" />
