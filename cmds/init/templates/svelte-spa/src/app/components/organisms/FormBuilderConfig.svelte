<script>
	//FormCardConfig
	import { createEventDispatcher, onMount } from 'svelte'
	import { Input } from 'Atoms'
	const dispatch = createEventDispatcher()
	export let key
	export let value
	if (key == 'customValues') {
		value = value ? value : { true: '', false: '' }
	}
	let timeout
	onMount(() => {
		if (key == 'allowGallery') {
			dispatch('change', true)
		}
		return () => {
			dispatch('destroy', '')
		}
	})
	$: {
		dispatch('change', value != null || value != undefined ? value : '')
	}
</script>

<style>
	input {
		display: inline-block;
		font-family: inherit;
		font-size: 14px;
		width: 100%;
		outline: none;
		background-color: #f7f7f7;
		border: solid 2px #f7f7f7;
		padding: 0.7em;
    	border-radius: 3px;
	}
	input:focus{
		border: solid 2px var(--sl-color-primary-50)
	}
	input::-webkit-outer-spin-button,
	input::-webkit-inner-spin-button {
		-webkit-appearance: none;
		margin: 0;
	}

	/* Firefox */
	input[type='number'] {
		-moz-appearance: textfield;
	}
</style>

{#if ['maxlength', 'min', 'max'].includes(key)}
	<label> <input min="0" type="number" bind:value /> </label>
{:else if key == 'customValues'}
	<label>Valor si verdadero <input type="text" bind:value={value.true} />
	</label>
	<label>Valor si falso <input type="text" bind:value={value.false} /> </label>
{/if}
