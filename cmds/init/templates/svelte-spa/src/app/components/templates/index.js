import AuthTemplate from './Auth.svelte'
import ModuleTemplate from './Module.svelte'
import FormTemplate from './Creator.svelte'
import FormsLayout from './FormsLayout.svelte'
import FormDetailLayout from './FormDetailLayout.svelte'

export default {
    Auth: AuthTemplate,
    Module: ModuleTemplate,
    Form: FormTemplate,
    Forms: FormsLayout,
    FormDetail: FormDetailLayout,
}

export const Auth = AuthTemplate
export const Module = ModuleTemplate
export const Form = FormTemplate
export const Forms = FormsLayout
export const FormDetail = FormDetailLayout