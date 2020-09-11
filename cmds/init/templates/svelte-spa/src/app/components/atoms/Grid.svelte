<script>
	export let column = '100px'
	export let fit = false
	export let align = 'start'
	export let justify = 'start'
	export let gap = 0
	export let margin = 0
	export let padding = 0
	export let explicit = false
	export let columns = 'repeat(2, 1fr)'

	$: columnTemplate =
		explicit == false
			? `repeat(auto-${
					fit ? 'fit' : 'fill'
			  }, minmax(calc(${column} - ${gap}px), 1fr))`
			: columns
	$: style = `
grid-template-columns: ${columnTemplate};
align-content: ${align}; 
justify-items: ${justify};
grid-gap: ${gap}px;
margin: ${margin};
padding: ${padding};
`
</script>

<style>
	main {
		display: grid;
	}
</style>

<main {style}>
	<slot />
</main>
