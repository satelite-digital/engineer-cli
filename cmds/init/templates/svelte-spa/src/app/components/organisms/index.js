import ModuleHeaderOrganism from './ModuleHeader.svelte'
import ModuleSidenavOrganism from './ModuleSidenav.svelte'
import FormBuilder from './FormBuilder.svelte'
import FormBuilderCard from './FormBuilderCard.svelte'
import FormBuilderConfig from './FormBuilderConfig.svelte'
import FormSettings from './FormSettings.svelte'
import FormWebhooks from './FormWebhooks.svelte'
import FormWebhooksCard from './FormWebhooksCard.svelte'

// Forms
import FormCardOrganism from './FormCard.svelte'
import RecordsOrganism from './Records.svelte'
// Folder
import FolderCardOrganism from './FolderCard.svelte'

//Header nav
import ProfileUserOrganism from './ProfileUser.svelte'
import ListAppsOrganism from './ListApps.svelte'

export default {
    ModuleHeader: ModuleHeaderOrganism,
    ModuleSidenav: ModuleSidenavOrganism,
    FormCard: FormCardOrganism,
    FolderCard: FolderCardOrganism,
    ProfileUser: ProfileUserOrganism,
    ListApps: ListAppsOrganism,
    Records: RecordsOrganism
}
export const ModuleHeader = ModuleHeaderOrganism
export const ModuleSidenav = ModuleSidenavOrganism
export const FormCard = FormCardOrganism
export const FolderCard = FolderCardOrganism
export const ProfileUser = ProfileUserOrganism
export const ListApps = ListAppsOrganism
export const Records = RecordsOrganism

export {
	FormBuilder,
	FormBuilderCard,
	FormBuilderConfig,
	FormSettings,
	FormWebhooks,
	FormWebhooksCard,
}