<script>
	export let resize = 'none'
	export let invalid = 'false'
	export let valid = 'false'
	export let label = ''
	export let helpText = ''
	export let rows = ''
	export let size = 'medium'
	export let value = ''
	export let maxlength = 400
	export let placeholder = ''
	function initial(node) {
		node.value = value
	}
</script>

<style>
	::part(helptext) {
		color: var(--helptext-color);
		background-color: var(--helptext-bgcolor);
	}
	::part(base) {
		color: var(--base-color);
		background-color: var(--base-bgcolor);
	}
	::part(label) {
		color: var(--label-color);
		background-color: var(--label-bgcolor);
	}
	::part(textarea) {
		color: var(--textarea-color);
		background-color: var(--textarea-bgcolor);
	}
</style>

<sl-textarea
	class="textarea"
	use:initial
	{resize}
	{invalid}
	{valid}
	{label}
	{helpText}
	{rows}
	{size}
	{maxlength}
	{placeholder}
	on:input={(e) => (value = e.target.value)} />
