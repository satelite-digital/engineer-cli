<script>
	import { flip } from 'svelte/animate'
	let m = {}
	export let items = [
		{ id: 1, name: '1' },
		{ id: 2, name: '2' },
		{ id: 3, name: '3' },
	]
	export let shadow = 0
	let elements = []
	let dragging = false
	let element
	let index
	let main
	let offset = {}
	let prev, curr, next
	function drag(e, i) {
		if (e.target.getAttribute('drag-item') === null) return
		main.style.height = `${main.getBoundingClientRect().height}px`
		index = i
		dragging = true
		element = elements[index]
		offset = { x: e.layerX, y: e.layerY + 15 }
		element.style.width = element.getBoundingClientRect().width + 'px'
		element.style.top = `${m.y - offset.y}px`
		element.style.left = `${m.x - offset.x}px`
	}

	async function endDrag(e) {
		if (dragging == true) {
			element.style.width = '100%'
			removeBorder()
			dragging = false
			setTimeout(() => {
				main.style.height = 'auto'
			}, 400)
		}
	}

	function handleMouse(e) {
		m.x = e.clientX
		m.y = e.clientY
		// offset = {x: e.layerX, y: e.layerY}
		if (dragging && element) {
			element.style.top = `${m.y - offset.y}px`
			element.style.left = `${m.x - offset.x}px`

			curr = element.getBoundingClientRect().top

			elements[index - 1] && elements[index - 1]
				? (prev = elements[index - 1].getBoundingClientRect().top)
				: (prev = null)
			elements[index + 1] && elements[index + 1]
				? (next = elements[index + 1].getBoundingClientRect().top)
				: (next = null)
			handleFlip(curr, prev, next)
		}
	}

	async function handleFlip(curr, prev, next) {
		if (curr && next && curr > next) {
			removeBorder()
			elements[index + 1].classList.add('drag-n-drop-bottom')
			let temp = JSON.parse(JSON.stringify(items[index]))
			items[index] = items[index + 1]
			items[index + 1] = temp
			index += 1
		}
		if (curr && prev && curr < prev) {
			removeBorder()
			elements[index - 1].classList.add('drag-n-drop-top')
			let temp = JSON.parse(JSON.stringify(items[index]))
			items[index] = items[index - 1]
			items[index - 1] = temp
			index -= 1
		}
	}
	function removeBorder() {
		elements.forEach((e) => {
			if(e){
				e.classList.remove('drag-n-drop-top')
				e.classList.remove('drag-n-drop-bottom')
			}
		})
	}
</script>

<style>
	.dragging {
		user-select: none;
	}
	.movable {
		display: inline-block;
		position: static;
		/* padding: 5px; */
		user-select: none;
		width: 100%;
		margin: 0;
		padding: 0;
		transition: margin 0.4s;
		/* background: white; */
	}
	.drag {
		/* transition: box-shadow 0.2s; */
		/* background: white; */
		height: auto;
		display: inline-block;
		position: fixed;
		box-shadow: var(--shadow, 0);
		z-index: 20;
		border-radius: 4px;
		padding: 0;
		margin: 0;
	}
	:global(.drag-n-drop-bottom) {
		margin-bottom: 30px !important;
	}
	:global(.drag-n-drop-top) {
		margin-top: 30px !important;
	}
	.main {
		height: auto;
	}
</style>

<svelte:window on:mousemove={handleMouse} />
<div
	bind:this={main}
	class:dragging
	class="main"
	style="--shadow: 0 0 {shadow * 5}px rgb(100,100,100, {shadow})">
	{#each items as item, i (item.id)}
		<div
			class="movable {i == index && dragging == true ? 'drag' : ''}"
			bind:this={elements[i]}
			dragname="1"
			animate:flip={{ duration: 400 }}
			on:mousedown={(e) => drag(e, i)}
			on:mouseup={endDrag}
			on:mouseleave={endDrag}>
			<slot {item} index={i} />
		</div>
	{/each}
</div>
