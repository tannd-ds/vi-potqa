<template>
    <ul>
        <li class="data-point-wrapper glass-bg" 
        v-for="(data_point, data_point_index) in current_input.confirmed_data" 
        :key="data_point"
        >
            <div class="field-wrapper">
                <div class="title">Question</div>
                <div id="question">
                    {{ data_point.question }}
                </div>
            </div>
            <div class="field-wrapper">
                <div class="title">Answer</div>
                <div id="answer">
                    {{ data_point.answer }}
                </div>
            </div>
            <div v-if="index_is_in_show_full(data_point_index)" class="field-wrapper">
                <div class="title">Contexts</div>
                <p id="contexts" v-for="context in data_point.contexts" :key="context[0]">
                    {{ context[0] }}<br>
                    {{ context[1].join(" ") }}
                </p>
            </div>
            <div v-if="index_is_in_show_full(data_point_index)" class="field-wrapper">
                <div class="title">Supporting Facts</div>
                <div id="facts">
                    {{ data_point.facts }}
                </div>
            </div>
            <button class="show-full-btn" @click="toggle_show_full_this_index(data_point_index)">
                <Icon :name="show_full_btn_icon_name[index_is_in_show_full(data_point_index)]" size="2em" :color="COLOR_MODE_ICON_COLOR[$colorMode.value]"/>
            </button>
            <button class="invisible-btn" @click="current_input.load_data_from_confirmed_data(data_point_index)" ></button>
        </li>
    </ul>

</template>

<script setup>

import { useAnnotationInputStore } from '~/stores/annotationInput'
const current_input = useAnnotationInputStore()

const COLOR_MODE_ICON_COLOR = {
    'dark': "hsl(var(--white-base-hsl-triplet))",
    'light': "hsl(var(--black-base-hsl-triplet), 0.3)",
}

const show_full = ref([])
const show_full_btn_icon_name = [
    `material-symbols:keyboard-arrow-down-rounded`,
    `material-symbols:keyboard-arrow-up-rounded`
]

function toggle_show_full_this_index(index) {
    let show_full_index = show_full.value.indexOf(index)
    if (show_full_index != -1)
        show_full.value.splice(show_full_index, 1)
    else 
        show_full.value.push(index)
}

function index_is_in_show_full(index) {
    let show_full_index = show_full.value.indexOf(index)
    if (show_full_index == -1)
        return 0
    return 1
}

</script>

<style scoped>

ul {
    padding-top: 2em;
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 1em;
}
.data-point-wrapper {
    padding-bottom: 3em;
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: left;
    gap: 0.5em;
}
.title {
    font-weight: bold;
    font-size: 16px;
}

button {
    width: 100%;
    background-color: transparent;
    border: none;
    position: absolute;
    bottom: 0;
    left: 0;
}

.show-full-btn {
    z-index: 10;
    height: 3em;
    overflow: hidden;
    opacity: 50%;
}
.invisible-btn {
    height: 100%;
}
</style>