import { defineStore } from 'pinia'
import { useGeneralStore } from './generalStore'

export const useAnnotationInputStore = defineStore('annotation_input', {
    state: () => {
        return { 
            confirmed_data: [], 
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
    persist: true,
    actions: {
        reset() {
            this.question_content = ""
            this.answer_content = ""
        },
        reset_contexts() {
            if (confirm('Are you sure you want to reset all Contexts?')) {
                this.contexts = []
                this.checked_ids = []
            }
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
                this.new_p_name = ""
                this.new_p_content = ""
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
            general_store.overlay.type = "edit"
            general_store.overlay.is_show = true
        },
        save_edit_context() {
            const general_store = useGeneralStore()
            this.contexts[this.edit_context.original_index].name = this.edit_context.name
            this.contexts[this.edit_context.original_index].content = this.edit_context.content.split(/(?<=[.!?])\s+/)
            general_store.overlay.is_show = false
            this.update_checked_id("edit", this.edit_context.original_index)
        },
        save_confirmed() {
            const general_store = useGeneralStore()
            let data = {}

            if (this.contexts.length == 0) {
            general_store.show_toast('error', 'Empty Contexts', 'Please add more Context Paragraph')
            return 
            }
            if (this.get_contexts_names.length == 0) {
            general_store.show_toast('error', 'Empty Facts', 'Please choose more facts')
            return 
            }
            if (this.question_content == "") {
            general_store.show_toast('error', 'Empty Question', 'Please add a Question')
            return 
            }
            if (this.answer_content == "") {
            general_store.show_toast('error', 'Empty Answer', 'Please add an Answer')
            return 
            }

            data['contexts'] = this.get_simplified_contexts
            data['facts'] = this.get_contexts_names
            data['question'] = this.question_content
            data['answer'] = this.answer_content

            general_store.show_toast('success', 'Success', 'Save data successfully')
            this.confirmed_data.push(data)
            this.reset()
            return [data]
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
        },
        remove_confirmed(clicked_index) {
            let index = clicked_index
            useGeneralStore().overlay.is_show = false
            if (this.confirmed_data.length == 0) {
                useGeneralStore().show_toast("warning", "Nothing here", "There is no confirmed data to be removed")
                return
            }
            if (confirm("Do you want to remove this?"))
                this.confirmed_data.splice(index, 1)
        },
        download_confirmed() {
            if (this.confirmed_data.length == 0) {
                useGeneralStore().show_toast("warning", "Nothing here", "There is no confirmed data to be downloaded")
                return
            }
            const jsonString = JSON.stringify(this.confirmed_data);
            const blob = new Blob([jsonString], { type: "application/json" });
            const url = URL.createObjectURL(blob);

            const link = document.createElement("a");
            link.href = url;
            link.download = "data.json";
            link.click();

            URL.revokeObjectURL(url);
            useGeneralStore().show_toast("success", "Success", "Successfully Download data.json");
        },
        parse_data_from_content() {
            if (this.new_p_content == "") {
                useGeneralStore().show_toast("warning", "Null Data", "Paragraph Content is null.");
                return
            }
            if (this.confirmed_data.length) {
                if (!confirm("Your Saved Data is not null, are you sure you want to overwrite it?")) 
                    return
            }
            this.confirmed_data = JSON.parse(this.new_p_content)
            this.new_p_content = ""
            useGeneralStore().show_toast("success", "Success", "Successfully parsed Data");
        },
        load_data_from_confirmed_data(clicked_index) {
            let index = clicked_index
            useGeneralStore().overlay.is_show = false
            this.contexts = this.get_desimplify_contexts(this.confirmed_data[index].contexts)
            this.question_content = this.confirmed_data[index].question
            this.answer_content = this.confirmed_data[index].answer
            this.checked_ids = this.get_context_id(this.confirmed_data[index].facts, this.confirmed_data[index].contexts)
            this.remove_confirmed(index)
        },
        get_desimplify_contexts(simplified_contexts) {
            let original_contexts = []
            for (let i = 0; i < simplified_contexts.length; i++)
                original_contexts.push({
                    'name': simplified_contexts[i][0],
                    'content': simplified_contexts[i][1]
                })
            return original_contexts
        },
        get_context_id(facts, contexts) {
            let result = [];
            for (let i = 0; i < facts.length; i++) {
                let context_id = this.get_context_index(facts[i][0], contexts)
                let sentence_id = facts[i][1]
                let checked_id = String(context_id) + '-' + String(sentence_id)
                result.push(checked_id)
            }
            return result
        },
        get_context_index(name, contexts) {
            for (let i = 0; (i < contexts.length) && (contexts[i][0] != name); i++)
            return i
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