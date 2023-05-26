<template>
    <Transition name="fade">
        <div 
            class="bg" 
            v-if="general_store.overlay.is_show"
        >
            <div class="glass-bg scrollable" ref="modal">
                <button  
                    class="icon-btn"
                    @click="general_store.overlay.is_show=false"
                >
                    <Icon name="fa6-solid:xmark" color="white" size="1.5em"/>
                </button>
                <slot>
                    <div v-if="general_store.overlay.type == 'edit'"> 
                        <OverlayEditContext />
                    </div>
                    <div v-else>
                        <OverlayAllData />
                    </div>
                </slot>

            </div>
        </div>
    </Transition>
</template>

<script setup>

import { useGeneralStore } from '~/stores/generalStore'
import { onClickOutside } from '@vueuse/core'

const general_store = useGeneralStore()
const modal = ref(null)
onClickOutside(modal, () => general_store.overlay.is_show = false)

const props = defineProps({
    show: Boolean,
})


</script>


<style scoped>

.fade-enter-active {
  transition: all 0.2s cubic-bezier(1, 0.5, 0.8, 1);
}

.fade-leave-active {
  transition: all 0.2s cubic-bezier(1, 0.5, 0.8, 1);
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.bg {
    height: 100vh;
    width: 100vw;
    position: absolute;
    background-color: hsla(0, 0%, 0%, 0.5   );
    display: flex;
    align-items: center;
    justify-content: center;
}

.glass-bg {
    position: relative;
    width: 60vw;
    min-width: 40em;
    max-height: 90vh;
    display: flex;
    flex-direction: column;
    gap: 1em;
    background-color: var(--black);
}

button {
    position: absolute;
    top: 1.5em;
    right: 1.5em;
}

</style>