import { defineStore } from 'pinia'
import { useGeneralStore } from './generalStore'

export const useAnnotationInputStore = defineStore('annotation_input', {
    state: () => {
        return { 
            new_p_name: "",
            new_p_content: "",
            question_content: "",
            answer_content: "",
            checked_ids: [],
            contexts: [],
            edit_context: {
                original_index: null,
                name: "",
                content: "",
            }
        }
    },
    actions: {
        reset() {
            this.new_p_name= ""
            this.new_p_content= ""
            this.question_content= ""
            this.answer_content= ""
            this.checked_ids= []
        },
        add_context() {
            const general_store = useGeneralStore()
            if (this.is_valid_context) {
                let sentences = this.get_sentences
                let new_context = {
                name: (this.new_p_name) ? this.new_p_name : this.get_unique_context_name,
                content: sentences
                }
                this.contexts.push(new_context)
            }
            else {
                general_store.show_toast('error', 'Fail', 'Paragraph\'s content is empty!')
            }
        },
        remove_context(context_id) {
            this.contexts = this.contexts.slice(0, context_id).concat(this.contexts.slice(context_id+1))
            this.update_checked_id("remove", context_id)
        },
        show_edit_context(context_id) {
            const general_store = useGeneralStore()
            this.edit_context.original_index = context_id
            this.edit_context.name = this.contexts[context_id]['name']
            this.edit_context.content = this.contexts[context_id]['content'].join(" ")
            general_store.is_show_overlay = true
        },
        save_edit_context() {
            const general_store = useGeneralStore()
            this.contexts[this.edit_context.original_index].name = this.edit_context.name
            this.contexts[this.edit_context.original_index].content = this.edit_context.content.split(/(?<=[.!?])\s+/)
            general_store.is_show_overlay = false
            this.update_checked_id("edit", this.edit_context.original_index)
        },
        update_checked_id(type="remove", context_id) {
            let result = []
            let ids = this.checked_ids
            if (type == "remove") {
                for (let i = 0; i < ids.length; i++) {
                    // Split Paragraph id and Sentence id from id String
                    let p_id = ids[i].slice(0, ids[i].indexOf("-"))
                    let s_id = ids[i].slice(ids[i].indexOf("-") + 1 )
                    /*
                    - If p_id is context_id: move on
                    - If p_id is less than context_id: add it to new list, doesn't need extra update
                    - If p_id is greater than context_id: update its index (by minus 1) then add it to new list
                    */
                    if (p_id == context_id) continue
                    if (p_id < context_id)
                        result.push(ids[i])
                    else 
                        result.push(`${p_id-1}-${s_id}`)
                }
            } else if (type == "edit") {
                for (let i = 0; i < ids.length; i++) {
                    // Split Paragraph id and Sentence id from id String
                    let p_id = ids[i].slice(0, ids[i].indexOf("-"))
                    let s_id = ids[i].slice(ids[i].indexOf("-") + 1 )
                    /*
                    - If p_id is context_id: move on
                    - If p_id is different than context_id: add it to new list
                    */
                    if (p_id == context_id) 
                        continue
                    else (p_id < context_id)
                        result.push(ids[i])
                }
            } else {
                prompt("update_checked_id has weird type")
            }
            this.checked_ids = result
        }
    },
    getters: {
        is_valid_context() {
            return this.new_p_content.trim()
        },
        get_sentences() {
            return this.new_p_content.split(/(?<=[.!?])\s+/)
        },
        get_contexts_names() {
            let ids = this.checked_ids
            let result = []
            for (let i = 0; i < ids.length; i++) {
                // Split Paragraph id and Sentence id from id String
                let p_id = ids[i].slice(0, ids[i].indexOf("-"))
                let s_id = ids[i].slice(ids[i].indexOf("-")+1)
                // Find the index of the Paragraph that has id = p_id
                result.push([this.contexts[p_id].name, Number(s_id)])
            }
            return result
        },
        get_simplified_contexts() {
            let simplified_contexts = []
            for (let i = 0; i < this.contexts.length; i++)
                simplified_contexts.push([this.contexts[i].name, this.contexts[i].content])
            return simplified_contexts
        },
        get_unique_context_name() {
            let chars = ['A', 'B', 'C', 'D', 'E', 'F']
            for (let char_index = 0; char_index < chars.length; char_index++) {
                let used = false
                for (let context_index = 0; context_index < this.contexts.length & !used; context_index++) {
                    if (this.contexts[context_index].name.trim() == `Paragraph ${chars[char_index]}`) {
                        used = true
                    }
                }
                if (!used) return `Paragraph ${chars[char_index]}`
            }
            return '??'

        }
    }
  
})