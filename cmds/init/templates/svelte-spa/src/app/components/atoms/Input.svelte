<script>
	export let clearable = false
	export let togglePassword = false
	export let placeholder = ''
	export let type = 'text'
	export let pill = false
	export let disabled = false
	export let width = '100%'
	export let size = 'medium'
	export let label = ''
	export let valid = false
	export let invalid = false
	export let max
	export let value = ''
	export let min
	export let maxlength
	export let minlength
	export let helperText = ''
	export let iconLeft = ''
	export let iconRight = ''
	export let padding = '0em'
	export let margin = '0em'
	export let element = {}

	let style = `margin:${margin};padding:${padding};width:${width}`
</script>

<style>
	.input::part(base){
		background: #F4F4F4;
		border-radius: 5px;
		color: #6F6F6F;
		font-family: Montserrat;
		border: none;

	}
</style>

<sl-input on:input class="input" on:slInput={(e) => (value = e.target.value)} {value} {placeholder} {type} {minlength} {maxlength} {max} {min} {disabled} {pill} toggle-password={togglePassword} {valid} {invalid} {label} {clearable} {size} {style} bind:this={element}>
	{#if iconLeft != ''}
		<sl-icon name="tag" slot="prefix" />
	{/if}

	{#if iconRight != ''}
		<sl-icon name="tag" slot="suffix" />
	{/if}
	{#if helperText != ''}
		<span slot="help-text">{helperText}</span>
	{/if}
</sl-input>
