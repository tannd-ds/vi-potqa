import { defineStore } from 'pinia'

export const useGeneralStore = defineStore('general_store', {
    state: () => {
        return { 
            is_show_overlay: false,

        }
    },
    actions: {
    },
    getters: {
    }
  
})