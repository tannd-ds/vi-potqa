<template>
        <div class="container">
            <!-- <div class="btn-with-text" title="Add more data!"> Number of Data: {{ current_input.confirmed_data.length }}</div> -->
            <div class="btn-with-text">
                <div class="text">Show Data</div>
                <div class="number" @click="show_all_data">
                    {{ current_input.confirmed_data.length }}
                </div>
            </div>
            <div class="btn-with-text">
                <div class="text">Download Data</div>
                <button class="icon-btn" @click="current_input.download_confirmed">
                    <Icon name="material-symbols:download-rounded" size="100%" color="var(--accent-color)"/>
                </button>
            </div>
            <div class="btn-with-text">
                <div class="text">Remove Last Data</div>
                <button class="icon-btn" @click="current_input.remove_last_confirmed">
                    <Icon name="material-symbols:backspace-outline-rounded" size="100%" color="var(--accent-color)"/>
                </button>
            </div>
        </div>
</template>

<script setup>

import { useAnnotationInputStore } from '~/stores/annotationInput';
import { useGeneralStore } from '~/stores/generalStore';

const current_input = useAnnotationInputStore()
const general_store = useGeneralStore()

function show_all_data() {
    if (current_input.confirmed_data.length < 1) {
        useGeneralStore().show_toast("warning", "Nothing here", "There is no confirmed data to be showed")
        return
    }
    general_store.show_overlay('all')
}


</script>

<style scoped>
.container {
    height: 100vh;
    padding: 1.5em 0.8em;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    gap: 1em;
    background-color: #ffffff15;
    color: var(--accent-color);
}

ul {
    list-style: none;
    padding: 0;
    margin: 0;
}

.btn-with-text {
    display: flex;
    flex-direction: row;
    justify-content: right;
    align-items: center;
    gap: 0.5em;
}

.btn-with-text:hover .number, .icon-btn {
    filter: drop-shadow(0em 0em 0.5em);
}

.text {
    display: none;
}

.btn-with-text:hover .text {
    right: 4em;
    position: absolute;
    display: flex;
    cursor: pointer;
    padding: 0.5em 1em;
    background-color: var(--black);
    border-radius: var(--base-border-radius);
}

.number {
    font-weight: 700;
    font-size: 1.5em;
    cursor: pointer;
    opacity: 20%;
    transition: all 0.3s ease;
}

.number:hover {
    opacity: 100%;
}

</style>