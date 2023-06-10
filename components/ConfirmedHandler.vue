<template>
        <div class="container">
            <!-- <div class="btn-with-text" title="Add more data!"> Number of Data: {{ current_input.confirmed_data.length }}</div> -->
            <div class="part">
                <div class="btn-with-text">
                    <div class="text">Show Data</div>
                    <div class="number" @click="show_all_data">
                        {{ current_input.confirmed_data.length }}
                    </div>
                </div>
                <div class="btn-with-text">
                    <div class="text">Load Data from JSON file</div>
                    <input hidden id="upload-confirmed" type="file" @change="current_input.uploadFile" accept="application/json">
                    <label class="icon-btn" for="upload-confirmed">
                            <Icon name="material-symbols:upload" :color="COLOR_MODE_ICON_COLOR[$colorMode.value]" size="100%"/>
                    </label>
                </div>
                <div class="btn-with-text">
                    <div class="text">Download Data</div>
                    <button class="icon-btn" @click="current_input.download_confirmed">
                        <Icon name="material-symbols:download-rounded" size="100%" :color="COLOR_MODE_ICON_COLOR[$colorMode.value]"/>
                    </button>
                </div>
            </div>
            <div class="part">
                <div class="separator"></div>
                <div class="btn-with-text">

                    <div class="text">
                        Change Theme
                    </div>
                    <button class="icon-btn" 
                        @click="() => {
                            if ($colorMode.value == 'dark') 
                                $colorMode.preference = 'light' 
                            else 
                                $colorMode.preference = 'dark'
                        }">
                        <Icon :name="COLOR_MODE_ICON[$colorMode.value]" size="100%" :color="COLOR_MODE_ICON_COLOR[$colorMode.value]"/>
                    </button>
                </div>
                <div class="btn-with-text">
                    <div class="text">Sign Out</div>
                    <button class="icon-btn" @click="client.auth.signOut()">
                        <Icon name="material-symbols:logout-rounded" size="100%" :color="COLOR_MODE_ICON_COLOR[$colorMode.value]"/>
                    </button>
                </div>

            </div>
        </div>
</template>

<script setup>

import { useAnnotationInputStore } from '~/stores/annotationInput';
import { useGeneralStore } from '~/stores/generalStore';

const current_input = useAnnotationInputStore()
const client = useSupabaseClient()

function show_all_data() {
    if (current_input.confirmed_data.length < 1) {
        useGeneralStore().show_toast("warning", "Nothing here", "There is no confirmed data to be showed")
        return
    }
    useGeneralStore().show_overlay('all')
}

const COLOR_MODE_ICON = {
    'dark': 'material-symbols:dark-mode-rounded',
    'light': 'material-symbols:light-mode'
}
const COLOR_MODE_ICON_COLOR = {
    'dark': "hsl(var(--accent-base-hsl-triplet))",
    'light': "hsl(var(--black-base-hsl-triplet), 0.3)",
}

</script>

<style scoped>
.container {
    padding: 2em 0.8em;
    height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    color: hsl(var(--accent-base-hsl-triplet));
    border: 0.2em solid hsl(var(--black-base-hsl-triplet), 0.3);
}
.dark-mode .container {
    background-color: #ffffff15;
    border: none;
}

.part {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1em;
}

.separator {
    margin-bottom: 1em;
    height: 0.2em;
    width: 100%;
    background-color: hsl(var(--black-base-hsl-triplet), 0.3);
}
.dark-mode .separator {
    background-color: hsl(var(--accent-base-hsl-triplet), 0.3);
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

.dark-mode .btn-with-text:hover .number, .dark-mode .icon-btn {
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
    background-color: hsl(var(--black-base-hsl-triplet));
    border-radius: var(--base-border-radius);
}

.number {
    font-weight: 700;
    font-size: 1.8em;
    cursor: pointer;
    opacity: 75%;
    transition: all 0.3s ease;
    color: hsl(var(--black-base-hsl-triplet), 0.3);
}
.dark-mode .number {
    color: hsl(var(--accent-base-hsl-triplet));
}

.number:hover {
    opacity: 100%;
}

</style>