<script>
	export let placeholder = ''
	export let value
	export let size = 1
	export let weight = 400
	export let maxlength = 100
	export let margin = "5px"
	export let padding = "5px"
	export let focus = true
	export let width = "100%"
</script>

<style>
	::-webkit-scrollbar {
		height: 3px;
		width: 3px;
	}
	::-webkit-scrollbar-thumb {
		background: #777;
	}
	::-webkit-scrollbar-track {
		background: #f7f7f7;
	}
	input {
		outline: none;
		border: none;
		font-size: var(--size, 1rem);
		font-weight: var(--weight, 400);
	}
	input:focus {
		border-bottom: var(--focus);
	}
	input::placeholder {
		font-size: var(--placeholder, 1rem);
		font-weight: var(--weight, 400);
	}
</style>

<input
	{maxlength}
	type="text"
	style="--size: {size}rem; --weight: {weight}; --placeholder: {size}rem;
	padding:{padding}; margin:{margin}; resize:none; width: {width};
	--focus: {focus ? 'solid 1px #ddd' : 'none'}"
	spellcheck="false"
	bind:value
	on:focus
	on:click
	{placeholder} />
