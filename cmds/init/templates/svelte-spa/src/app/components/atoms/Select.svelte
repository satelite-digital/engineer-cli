<script>
	import {createEventDispatcher} from 'svelte'
	const dispatch = createEventDispatcher()
	export let value
	export let label = ''
	export let placeholder = 'Elige'
	export let margin = '0'
	let style = `
		margin: ${margin};
	`
	function initial(node){
		value ? node.value = value : ''
	}
</script>

<sl-select use:initial {style} {label} {placeholder} on:slChange on:slChange={val => value = val.target.value} {value}>
	<slot></slot>
</sl-select>
