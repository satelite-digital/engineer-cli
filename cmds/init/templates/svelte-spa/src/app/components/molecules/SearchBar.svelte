<script>
	export let focusInput = false;
	export let input;
	export let type = 'search';
	export let value = '';
	export let boxShadow= "2px 2px 5px 4px  #E6EBFF, 2px 2px 1px 1px #E6EBFF;"
	
	export let handleInput = (e) => {
			value = e.target.value;
	}
	
	let focus = (node) => {
			let focus = event => {
			focusInput = true;
		}
		let blur = event =>{
			value == '' ? focusInput = false : '';
		}
		node.addEventListener('focus', focus)
		node.addEventListener('blur', blur)
		return {
			destroy(){
				node.removeEventListener('focus', focus)
				node.removeEventListener('blur', blur)
			}
		}
	}
	
	let clicked = value => input.value !='' ? input.value = '' : input.focus();
</script>

<style>

	.search-button::part(base) {
	
    border-radius: 8px 8px; 
		background: #15CEBC;
		color: #fff;
		padding: none;
		border: 3px solid #E6EBFF;
		width: 40px;
  }
	.icon {
		font-size: 16px;
	}
	.search-input::part(base) {
		box-shadow: 0px 0px 6px rgba(13, 60, 255, 0.15);
		border: none;
		color: #E6EBFF;
		border-radius: 8px 8px;
		place-content: center;
		align-items: center;
		font-size: 1em;
		font-weight: 500;
	}
	
	.search-input::part(input) {
		color: #b3c0f5;
	}
</style>
<svelte:head>
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@shoelace-style/shoelace@2.0.0-beta.14/dist/shoelace/shoelace.css">
<script type="module" src="https://cdn.jsdelivr.net/npm/@shoelace-style/shoelace@2.0.0-beta.14/dist/shoelace/shoelace.esm.js"></script>
</svelte:head>

<sl-input class="search-input" placeholder="Buscar formulario..." size="large" bind:this={input}  type={type} on:input={handleInput} use:focus>
	<sl-button class="search-button" size="medium" slot="suffix" on:click={()=> clicked(focusInput)}>
  	<div class="icon">
				{#if !focusInput}
					<sl-icon name="search" size="medium"></sl-icon>
				{:else}
					<sl-icon name="x" size="medium"></sl-icon>
				{/if}
		</div>
	</sl-button>
</sl-input>