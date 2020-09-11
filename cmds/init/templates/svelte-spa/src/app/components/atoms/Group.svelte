<script>
    export let direction = 'column'
    export let width = "auto"
    export let height = "auto"
    export let justify = "flex-start"
    export let bgColor = 'transparent'
    export let alignItems = 'normal'
    export let padding = '0em 0em'
	export let margin = 'none'
	export let placeContent = 'space-between' // align y justify tienen conflicto con placeContent, deberia de usarse solo align,justify juntos o placeContent como shorthand
    export let flexWrap = 'nowrap'
 
    let style = '';

	$: style = `
                --direction:${direction};
                --width:${width};
                --height:${height};
                --justify:${justify};
                --bgColor:${bgColor};
                --alignItems:${alignItems};
                --padding: ${padding};
                --margin:${margin};
                --placeContent:${placeContent};
                flex-wrap:${flexWrap};
                `
</script>

<style>
	.group {
		display: flex;
		flex-direction: var(--direction);
		justify-content: var(--justify);
		line-height: var(--line-height);
		width: var(--width);
		height: var(--height);
		background: var(--bgColor);
		padding: var(--padding);
		margin: var(--margin);
		align-items: var(--alignItems);
		place-content: var(--placeContent);
		box-sizing: border-box;
	}
</style>

<div class="group" {style}>
    <slot></slot>
</div>