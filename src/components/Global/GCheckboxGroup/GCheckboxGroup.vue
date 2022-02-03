<template>
    <div
        :id="id"
        class="checkboxGroup"
        :class="{'checkboxGroup--vertical': isVertical}"
        :aria-labelledby="`${id}-label`"
    >
        <h3
            v-if="label"
            :id="`${id}-label`"
            class="checkboxGroup__label"
            v-text="label"
        />

        <ul class="checkboxGroup__list">
            <li
                v-for="(checkbox, index) in items"
                :key="index"
                class="checkboxGroup__item"
            >
                <GCheckbox
                    :id="`${id}-checkbox-${index + 1}`"
                    v-bind="checkbox"
                />
            </li>
        </ul>
    </div>
</template>

<script src="./GCheckboxGroup" />
