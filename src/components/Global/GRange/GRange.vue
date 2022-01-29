<template>
    <div
        class="range"
        :class="{'range--tooltip': isTooltipped}"
    >
        <span
            v-if="isLabelled"
            ref="minLabel"
            class="range__label range__label--min"
            v-text="min"
        />

        <div class="range__container">
            <input
                ref="rangeInput"
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
                @mousedown="toggleTooltip"
                @mouseup="toggleTooltip"
            >
        
            <div
                v-if="isTooltipped"
                ref="tooltip"
                class="range__tooltip"
                :class="{'active': isTooltipActive}"
                :style="{left: `${tooltipPosition}px`}"
            >
                <span v-text="tooltip && tooltip.isCustom ? tooltip.value : value" />
            </div>
        </div>


        <span
            v-if="isLabelled"
            ref="maxLabel"
            class="range__label range__label--max"
            v-text="max"
        />
    </div>
</template>

<script src="./GRange" />
