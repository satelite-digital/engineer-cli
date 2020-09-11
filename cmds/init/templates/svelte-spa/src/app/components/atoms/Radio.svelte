<script>
	export let checked = false
	export let label = ''
	export let disabled = false
	export let indeterminate = false
</script>

<sl-radio {disabled} {checked} {indeterminate}>{label}</sl-radio>