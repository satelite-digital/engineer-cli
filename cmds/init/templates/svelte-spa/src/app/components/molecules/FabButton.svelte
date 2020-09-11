<script>
	import {Icon, Tooltip} from 'Atoms'
	import {createEventDispatcher} from 'svelte'
	const dispatch = createEventDispatcher()
	let open = false;
	export let options = []
	export let icon
	export let curve = 0
	export let x = 5
	export let y = 60
	export let position = 'bottom-left'
	export let fgColor = 'white'
	export let bgColor = 'transparent'
	export let bgColorItem = '#15CEBC'
	if(position.includes('bottom')){
		y = y * -1
	}
	if(position.includes('right')){
		x = x * -1
	}
	
	function openMenu(e){
		open = !open
	}
	function sendEvent(key){
		dispatch('click', key)
		open = false
	}
	function pop(node, params){
		let {index, duration} = params
		return {
			duration,
			css: u => {
			
				return `
					transform: translateY(${(y * (index+1))*u}px) translateX(${(x * (index+1)*((index+1)*(curve)))*(u)}px) scale(${u+0.1})
				`
			}
		}
	}
	
	let positions = {
		'bottom-left': 'top: auto; left: 20px; bottom: 20px',
		'bottom-right': 'top: auto; right: 20px; bottom: 20px',
		'top-left': 'left: 20px; top: 20px',
		'top-right': 'right: 20px; top: 20px',
	}
</script>
<style>
	.icon{
		-webkit-highlight: none;
		-webkit-tap-highlight-color: transparent;
		position: fixed;
		/* background: white; */
		/* border: solid 1px #ddd; */
		padding: 12px;
		display:flex;
		user-select: none;
		cursor: pointer;
		place-items: center;
		/* border-radius: 50px; */
		z-index: 60;

		background: #0000FF;
		/* Primary-darker light */

		border: 4px solid #C1C1FF;
		box-sizing: border-box;
		border-radius: 10px
	}
	.item{
		font-size: 1em;
		z-index: 50;
		transition: all 0.2s
	}
	.icon:hover{
		box-shadow: 0px 0px 5px #ddd;
	}
	
</style>

<span class='icon' style="{positions[position]}" on:click={openMenu} on:click>
	<Icon {icon} size=1.5 {fgColor} cursor="pointer" {bgColor} padding=0 alignItems="flex-start"></Icon>
</span>
{#if open == true}
	{#each Object.keys(options) as key, index}
		<span on:click="{e => sendEvent(key)}" transition:pop="{{index: index, duration: 200}}" class="icon item" style="transform: translateY({y * (index+1)}px) translateX({x * (index+1)*((index+1)*(curve))}px); {positions[position]};background:{bgColorItem}">
			{#if options[key].text == ''}
				<Icon icon={options[key].icon} size=1.5 {fgColor} {bgColorItem} padding=0 alignItems="flex-start"></Icon>
			{:else}
				<Tooltip content={options[key].text} placement='left' open={true}>
					<Icon icon={options[key].icon} size=1.5 {fgColor} {bgColorItem} padding=0 alignItems="flex-start"></Icon>
				</Tooltip>
			{/if}
		</span> 
	{/each}
{/if}
