<template>
    <ul>
        <li class="data-point-wrapper glass-bg" v-for="data_point in current_input.confirmed_data" :key="data_point">
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
            <div class="field-wrapper">
                <div class="title">Contexts</div>
                <p id="contexts" v-for="context in data_point.contexts" :key="context[0]">
                    {{ context }}
                </p>
            </div>
            <div class="field-wrapper">
                <div class="title">Supporting Facts</div>
                <div id="facts">
                    {{ data_point.facts }}
                </div>
            </div>
        </li>
    </ul>

</template>

<script setup>

import { useAnnotationInputStore } from '~/stores/annotationInput'
const current_input = useAnnotationInputStore()

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
</style>