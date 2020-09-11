<script>
	export let icon = 'gear'
	export let circled = false
	export let size = 1
	export let bgColor = 'transparent'
	export let fgColor = 'black'
	export let padding = '0.4em 0.5em 0.5em 0.5em'
	export let margin = '0'
	export let dragItem = false
	export let cursor = 'default'

	size = parseFloat(size)

	let style = `
                width:${size}em;
                margin: ${margin};
                height:${size}em;
                background-color:${bgColor};
                --padding:${padding};
                `
</script>

<style>
	.circle {
		border-radius: 50%;
		padding: 0.4em 0.5em 0.5em 0.5em;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.icon {
		/* padding: var(--padding); */
	}
</style>

{#if circled}
	<div drag-item={dragItem == true ? true : null} class="circle" {style}>
		<sl-icon 
			drag-item={dragItem == true ? true : null} 
			name={icon}
			style="color:{fgColor};font-size:{size}em; cursor: {cursor};" />
	</div>
{:else}
	<sl-icon
		drag-item={dragItem == true ? true : null}
		class="icon"
		name={icon}
		style="color:{fgColor};font-size:{size}em; cursor: {cursor};" />
{/if}
