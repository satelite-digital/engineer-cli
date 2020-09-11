<script>
	import { Icon } from 'Atoms'
	export let text = ''
	export let icon = ''
	export let width = '100%'
</script>

<style>
	p {
		display: flex;
		align-items: center;
		border-bottom: solid 1px #ddd;
		color: #999;
		padding: 3px 10px;
		margin: 0;
		gap: 5px;
		user-select: none;
	}
</style>

<p style="width:calc({width} - 20px)">
	{#if icon != ''}
		<Icon fgColor="#999" {icon} />
	{/if}
	{text}
</p>
