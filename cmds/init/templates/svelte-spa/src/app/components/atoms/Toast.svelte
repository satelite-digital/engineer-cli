<script>
	import { NotificationDisplay, notifier } from '@beyonk/svelte-notifications'
	let themes = { // These are the defaults
		danger: '#eb5757d9',
		success: '#27ae60a1',
		warning: '#f2994aa6',
		info: '#171717CC',
		default: '#171717CC' // relates to simply '.show()'
	}
	export const notify = notifier
</script>
<NotificationDisplay {themes} />