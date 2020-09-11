<script>
	export let checked = false
	export let label = ''
	export let disabled = false
	export let indeterminate = false
	export let margin = ''
	function initial(node) {
		node.checked = checked
		return{
			update: (val)=>{
				node.checked = val
			}
		}
	}
</script>

<sl-checkbox
	on:input
	style="margin: {margin}"
	use:initial={checked}
	on:input={(e) => (checked = e.target.checked)}
	{disabled}
	{indeterminate}>
	{label}
</sl-checkbox>
