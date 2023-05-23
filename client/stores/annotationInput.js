import { defineStore } from 'pinia'
import { useGeneralStore } from './generalStore'

function is_valid_p(p_name, sentences) {
  return p_name && sentences != []
}

export const useAnnotationInputStore = defineStore('annotation_input', {
    state: () => {
        return { 
            new_p_name: "",
            new_p_content: "",
            question_content: "",
            answer_content: "",
            checked_ids: [],
            contexts: [],
            edit_p_index: 0,
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
            let sentences = this.get_new_sentences
            if (is_valid_p(this.new_p_name, sentences)) {
                let new_context = {
                name: this.new_p_name,
                content: sentences
                }
                this.contexts.push(new_context)
            }
            else {
                general_store.show_toast('error', 'Fail', 'Paragraph\'s name or content is empty')
            }
        },
        remove_context(context_id) {
            this.contexts = this.contexts.slice(0, context_id).concat(this.contexts.slice(context_id+1))
            this.update_checked_id(context_id)
        },
        edit_context(context_id) {
            return true  
        },
        update_checked_id(removed_p_id) {
            let ids = this.checked_ids
            let result = []
            for (let i = 0; i < ids.length; i++) {
            // Split Paragraph id and Sentence id from id String
            let p_id = ids[i].slice(0, ids[i].indexOf("-"))
            let s_id = ids[i].slice(ids[i].indexOf("-") + 1 )
            /*
            - If p_id is removed_p_id: move on
            - If p_id is less than remove_p_id: add it to new list, doesn't need extra update
            - If p_id is greater than remove_p_id: update its index (by minus 1) then add it to new list
            */
            if (p_id == removed_p_id) continue
            if (p_id < removed_p_id)
                result.push(ids[i])
            else 
                result.push(`${p_id-1}-${s_id}`)
            }
            this.checked_ids = result
        }
    },
    getters: {
        get_new_sentences() {
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
        }
    }
  
})