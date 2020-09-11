<script>
	// import {blur} from 'svelte/transition'
	export let open = false
	export let duration = 200
	export let admin = true
	export function show() {
		open = true
	}
	export function hide() {
		open = false
	}
	export function toggle() {
		open = !open
	}
	function blur(node, params) {
		let { duration } = params
		return {
			duration,
			css: (u) => {
				return `opacity: ${u};`
			},
		}
	}
</script>

<style>
	::-webkit-scrollbar {
		width: 0px; /* Remove scrollbar space */
		background: transparent; /* Optional: just make scrollbar invisible */
	}
	.modal {
		position: fixed;
		z-index: 20;
		overflow: scroll;
		top: 0;
		height: 100vh;
		width: 100vw;
		background-color: white;
		left: 0;
	}
	.modal-public {
		position: fixed;
		z-index: 20;
		overflow: scroll;
		top: 65px;
		height: calc(100vh - 65px);
		width: 100vw;
		background-color: white;
		left: 0;
	}
	.close {
		cursor: pointer;
		position: fixed;
		top: 25px;
		right: 25px;
		user-select: none;
	}
	@media screen and (max-width: 768px) {
		.modal {
			height: calc(100vh - 131px);
		}
		.modal-public {
			height: calc(100vh - 64px);
		}
	}
</style>

{#if open == true}
	<div
		transition:blur={{ duration: duration }}
		class={admin == true ? 'modal' : 'modal-public'}>
		<svg
			class="close"
			on:click={() => (open = false)}
			xmlns="http://www.w3.org/2000/svg"
			width="25"
			height="25"
			viewBox="0 0 512 512">
			<path
				d="M448,256c0-106-86-192-192-192S64,150,64,256s86,192,192,192S448,362,448,256Z"
				style="fill:none;stroke:#666;stroke-miterlimit:10;stroke-width:32px" />
			<line
				x1="320"
				y1="320"
				x2="192"
				y2="192"
				style="fill:none;stroke:#666;stroke-linecap:round;stroke-linejoin:round;stroke-width:32px" />
			<line
				x1="192"
				y1="320"
				x2="320"
				y2="192"
				style="fill:none;stroke:#666;stroke-linecap:round;stroke-linejoin:round;stroke-width:32px" />
		</svg>
		<slot />
	</div>
{/if}
