<script>
	export let content = ''
	export let placement = 'right'
	export let trigger = 'hover'
	export let skidding = 0
	export let open = false
	export let distance = 10
	export let disabled = false
	export let zIndex = 'none'
	export let margin = '0 0 2em 0'
	skidding = parseFloat(skidding)
	const style = `--sl-tooltip-arrow-size: 0; margin:${margin}; z-index:${zIndex}; display: contents;`
</script>

<div {style}>
	<sl-tooltip {content} {placement} {trigger} {skidding} {distance} {disabled}>
		<slot />
	</sl-tooltip>
</div>
