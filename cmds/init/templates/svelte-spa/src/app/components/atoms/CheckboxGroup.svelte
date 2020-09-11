<script>
	export let options = [];
	export let selected = [];
	let checked = false
	
	function values(node){
		let index = -1, i = -1;
		if (node.checked){
			selected.forEach(item => {
				index++;
				if (item == node.value){
					i = index;
				}
			})
			if (i == -1){
				selected=[...selected, node.value]
			}
		} else {
			selected.forEach(item => {
				index++;
				if (item == node.value){
					i = index;
				}
			})
			if (i > -1){
				selected.splice(i, 1);
				selected = selected
			}
		}
	}
	function initial(node) {
		node.checked = checked;
		selected.forEach(item => {
			if (node.value == item) {
				node.checked = true;
			}
		})
	}
</script>

{#each options as value}
<sl-checkbox name="option" use:initial on:input={e => values(e.target)} {value}>{value}</sl-checkbox><br>
{/each}