import API from './api.js'
import { confirmPassword, forgotPassword, signIn } from './auth.service.js'
{{#each model}}
import {{id}} from './{{{id}}}.service.js'
{{/each}}

export default {
    instance : API.instance,
    auth : {
        confirmPassword,
        forgotPassword,
        signIn
    },
    {{#each model}}
    {{id}}{{#if @last}}{{else}},{{/if}}
    {{/each}}
}