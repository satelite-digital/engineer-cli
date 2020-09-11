<script>
	export let type = 'default'
	export let size = 'medium'
	export let pill = false;
	export let circle = false
	export let iconLeft = ''
	export let iconRight = ''
	export let padding = '0em'
	export let margin = '0em'
	export let loading = false
	export let width = 'auto'
	export let border = 'none'
	export let borderRadius = 'none'
	export let colorText= "var(--sl-primary-color)"
	export let height= "black"
	export let background = "transparent"
	export let backgroundHover = "transparent"
	export let href =''

	let style = `padding:${padding};margin:${margin};width:${width};height:${height};--border:${border};border-radius:${borderRadius};--color:${colorText};--background:${background};--background-hover:${backgroundHover};`
	import {link} from 'svelte-spa-router'

</script>
<style>
	::part(base){
		color: var(--color, #333);
		background: var(--background, --formspace-primary);
	}
</style>
{#if type=="link" && href != ''}
	<a {href} use:link>
		<sl-button {loading} {type} {size} {pill} {circle} on:click {style}>
			{#if iconLeft != ''}
				<sl-icon name={iconLeft} slot="prefix"></sl-icon>
			{/if}
			{#if iconRight != ''}
				<sl-icon name={iconRight} slot="suffix"></sl-icon>
			{/if}
			<slot></slot>
		</sl-button>
	</a>
{:else}
	<sl-button {loading} {type} {size} {pill} {circle} on:click {style}>
			{#if iconLeft != ''}
				<sl-icon name={iconLeft} slot="prefix"></sl-icon>
			{/if}
			{#if iconRight != ''}
				<sl-icon name={iconRight} slot="suffix"></sl-icon>
			{/if}
			<slot></slot>
		</sl-button>
{/if}