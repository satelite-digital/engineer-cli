<script>
	import { FormWebhooksCard as Webhook } from '.'
	import { FormHook } from 'Helpers'
	import { Button } from 'Atoms'
	import { FabButton } from 'Molecules'

	// https://script.google.com/macros/s/AKfycbymwyVBIZ2AedT0mpy1d7XOCFTelnrdU3V8xT5rU15CdGq8-giE/exec
	export let value
	let hooks = []
	if (value && value.length) {
		hooks = value.map((e) => new FormHook(e))
	}
	$: value = hooks

	function deleteHook(i){
		hooks.splice(i,1)
		hooks = hooks
	}
</script>

{#each hooks as hook, i}
	<Webhook bind:hook on:delete={()=>{deleteHook(i)}} />
{/each}
<FabButton
	position="bottom-right"
	icon="plus-square"
	on:click={(e) => (hooks = [...hooks, new FormHook()])} />
