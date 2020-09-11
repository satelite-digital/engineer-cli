<script>
	import { link } from 'svelte-spa-router'
	import active from 'svelte-spa-router/active'
	export let icon = 'gear'
	export let circled = false
	export let size = 0.5
	export let bgColor = '#15CEBC'
	export let fgColor = '#8D8D8D'
	export let padding = '0.4em 0.5em 0.5em 0.5em'
	export let margin = 'none'
	export let type = 'button'
	export let href = ''
	export let hoverStyle = {
		bgColor: 'rgba(21, 206, 188, 0.15)',
		fgColor: '#11BEAD',
	}
	export let activeStyle = {
		bgColor: 'rgba(21, 206, 188, 0.15)',
		fgColor: '#15CEBC',
	}
	size = parseFloat(size)
	// console.log(test)
	export let width = `${size + 1}em`
	export let height = `${size + 1}em`

	export let placeSelf = 'center'
	export let src = ''
	let style = `
                --size:${size}em;
                --width:${width};
                --height:${height};
                --backgroundColor:${bgColor};
                --margin:${margin};
                --padding:${padding};
                --color:${fgColor};
                --hoverBackgroundColor:${hoverStyle.bgColor};
                --hoverColor:${hoverStyle.fgColor};
                --activeBackgroundColor:${activeStyle.bgColor};
                --activeColor:${activeStyle.fgColor};
                    place-self: ${placeSelf};
                `
</script>

<style>
	.circle {
		width: var(--width);
		height: var(--height);
		padding: var(--padding);
		margin: var(--margin);
		display: flex;
		cursor: pointer;
		justify-content: center;
		align-items: center;
	}

	.circle:hover {
		border-radius: 50%;
		background-color: var(--hoverBackgroundColor);
		color: var(--hoverColor);
	}

	.icon-button::part(base):hover {
		color: var(--hoverColor);
	}

	:global(a.active) {
		border-radius: 50%;
		background-color: var(--activeBackgroundColor);
		color: var(--activeColor);
	}

	.active > .icon-button::part(base) {
		padding: var(--padding);
		color: var(--activeColor);
		font-size: var(--size);
		font-weight: 600;
	}

	.icon-button::part(base) {
		padding: var(--padding);
		color: var(--color);
		font-size: var(--size);
	}
</style>

{#if circled && type != 'link'}
	<div class="circle" {style} on:click >
		<sl-icon-button class="icon-button"name={icon} />
	</div>
{:else if circled && type == 'link'}
	<a {href} class="circle" {style} use:active use:link>
		<sl-icon-button class="icon-button" class:active name={icon} />
	</a>
{:else if src == ''}
	<sl-icon-button {style} class="icon-button" on:click name={icon} />
{:else}
	<sl-icon-button {style} class="icon-button" on:click {src} />
{/if}
