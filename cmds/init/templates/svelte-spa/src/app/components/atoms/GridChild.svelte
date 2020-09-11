<script>
	export let column = ''
	export let row = ''
	export let justify = 'start'
	export let align = 'start'
	export let width = 'auto'
</script>

<style>
	div {
		/* 		display: contents; */
		margin: 0;
		padding: 0;
	}
</style>

<div
	style="width: {width}; grid-column: {column}; grid-row: {row}; align-self: {align};
	justify-self: {justify}">
	<slot />
</div>
