import axios from "axios";
export default defineNuxtPlugin((nuxtApp) => {

    axios.defaults.withCredentials = true
    axios.defaults.baseURL = 'http://localhost:8989/json'

    return {
            provide: {
                axios: axios,
            },
        };
});