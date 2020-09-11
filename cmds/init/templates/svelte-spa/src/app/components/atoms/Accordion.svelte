<script>
	import { sineInOut } from 'svelte/easing'
	export let borderRadius = 0
	export let padding = '0.5em'
	export let margin = '0'
	export let open = false
	function toggle() {
		open = !open
	}
	function hide() {
		open = false
	}
	function show() {
		open = true
	}
	function scale(node) {
		let h = parseInt(getComputedStyle(node).height)
		return {
			duration: 200,
			easing: sineInOut,
			css: (u) => `
transform-origin: top;
transform: scaleY(${u});
opacity: ${u};
`,
		}
	}

	let spec = `slot="content" \nto open: \n<Accordion let:show> \n	<another-component on:click={show} slot="control" or slot="content">\n		Open accordion!\n	</another-component>\n</Accordion>`
</script>

<style>
	main {
		width: calc(100% - 20px);
		position: relative;
		box-shadow: 0 0 5px #ccc;
		background: white;
		padding: 10px;
	}
	.control {
		display: grid;
		grid-template-columns: auto 40px;
	}
	.arrow {
		cursor: pointer;
		place-self: center;
		transition: all 0.2s;
		fill: #666;
	}
	.open {
		transform: rotate(90deg);
	}
	.hide {
		display: none;
	}
</style>

<main
	style="border-radius:{borderRadius}px; padding: {padding}; margin:{margin}">
	<div class="hide">
		<slot {toggle} {show} {hide} />
	</div>
	<div class="control">
		<slot name="control">slot="control"</slot>
		<svg
			on:click={toggle}
			class="arrow"
			class:open
			xmlns="http://www.w3.org/2000/svg"
			height="24"
			viewBox="0 0 24 24"
			width="24">
			<path d="M0 0h24v24H0V0z" fill="none" />
			<path d="M10.02 6L8.61 7.41 13.19 12l-4.58 4.59L10.02 18l6-6-6-6z" />
		</svg>
	</div>
	{#if open}
		<div transition:scale>
			<slot name="content">
				<pre>{spec}</pre>
			</slot>
		</div>
	{/if}
</main>
