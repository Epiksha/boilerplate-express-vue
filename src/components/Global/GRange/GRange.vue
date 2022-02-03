<template>
    <div
        class="range"
        :class="{'range--tooltip': isTooltipped}"
    >
        <span
            v-if="isLabelled"
            ref="minLabel"
            class="range__label range__label--start"
            v-text="startLabel ? startLabel : min"
        />

        <div class="range__container">
            <input
                :id="id"
                ref="rangeInput"
                :aria-label="ariaLabel"
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
                @mousedown="() => { toggleTooltip(); $emit('mousedown'); }"
                @mouseup="() => { toggleTooltip(); $emit('mouseup'); }"
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
            class="range__label range__label--end"
            v-text="endLabel ? endLabel : max"
        />
    </div>
</template>

<script src="./GRange" />
