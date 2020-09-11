<script>
	export let options = [];
	export let selected = "";
	let checked = false
	
	function initial(node){
		if (node.value == selected){
			node.checked = true
		} else {
			node.checked = checked
		}
	}
</script>

{#each options as value}
<sl-radio name="option" use:initial on:input={e => selected = e.target.value} {value}>{value}</sl-radio><br>
{/each}