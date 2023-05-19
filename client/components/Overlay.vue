<template>
    <div 
        class="bg" 
        v-if="show"
    >
        <div class="glass-bg">
            <button  
                class="icon-btn"
                @click="general_store.is_show_overlay=false"
            >
                X
            </button>
            <slot> Content </slot>

        </div>
    </div>
</template>

<script setup>

import { useGeneralStore } from '~/stores/generalStore';
const general_store = useGeneralStore()

const props = defineProps({
    show: Boolean,
})

</script>


<style scoped>

.bg {
    height: 100vh;
    width: 100vw;
    position: absolute;
    background-color: hsla(0, 0%, 0%, 0.7);
    display: flex;
    align-items: center;
    justify-content: center;
}

.glass-bg {
    position: relative;
    min-width: 30em;
    display: flex;
    flex-direction: column;
    gap: 1em;
}

button {
    position: absolute;
    top: 1.5em;
    right: 1.5em;
    transform: scale(2);
}

</style>