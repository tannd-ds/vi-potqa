import { defineStore } from 'pinia'

export const useGeneralStore = defineStore('general_store', {
    state: () => {
        return { 
            overlay: {
                is_show: false,
                type: "edit",

            },
            toast: {
                is_show: false,
                type: "success",
                title: "toast_title",
                content: "Toast Content",
            }
        }
    },
    actions: {
        show_toast(type='sucess', title, content) {
            this.toast.type = type
            this.toast.title = title
            this.toast.content = content
            this.toast.is_show = true
            setTimeout(() => {this.toast.is_show = false}, 3000)
        },
        show_overlay(type="all") {
            this.overlay.type = type
            this.overlay.is_show = true
        }
    },
    getters: {
    }
  
})