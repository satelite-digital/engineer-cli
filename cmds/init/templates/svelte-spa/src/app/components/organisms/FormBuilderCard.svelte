
<script>
	//FieldCard
	import fieldTypes from './fieldTypes.json'
	import {
		Accordion,
		Group,
		Grid,
		GridChild,
		TextArea,
		Input,
		Editable,
		IconButton,
		Select,
		Text,
		Icon,
		Checkbox,
		Radio,
		Button,
		Option,
		Divider,
	} from 'Atoms'
	import { Placeholder } from 'Molecules'
	import { FormBuilderConfig as Config } from 'Organisms'
	import { createEventDispatcher } from 'svelte'
	const dispatch = createEventDispatcher()
	export let field = {
		name: '',
		type: '',
		required: false,
		options: [''],
		config: {},
	}
	export let hooks
	let selected
	let connection = false
	$: selected ? (field.type = selected.type) : ''
	if (field.type != '') {
		selected = fieldTypes.find((e) => e.type == field.type)
	}
	function addOption() {
		field.options = [...field.options, '']
	}
	function deleteOption(option, i) {
		field.options.splice(i, 1)
		field = field
	}
	function clone() {
		dispatch('clone', { field, selected })
	}
	function del() {
		dispatch('delete', '')
	}
	function assignConfig(key, value){
		field.config[key] = value
	}
	function deleteConfig(key){
		if(selected.config && selected.config[key] && selected.config[key].use == false){
			delete field.config[key]
			field = field
		}
	}
	function resetConfig(){
		if(selected && !selected.config){
			field.config = {}
			return
		}
		else{
			let config = {}
			let keys = Object.keys(field.config)
			keys.forEach(key => {
				if(selected.config[key]){
					config[key] = field.config[key]
				}
			})
			field.config = config
		}
		
	}
	function hookFilter(compatible){
		return function(hook){
			let types = hook.template.keys.reduce((acc, key)=>{
				return [...acc, key.type]
			}, [])
			console.log(hook, types, compatible)
			return compatible.some(e => {
				return types.includes(e)
			})
		}
	}
	$:{
		selected
		resetConfig()
	}
	$:console.log(hooks)
</script>

<style>
	.flex {
		display: flex;
		align-items: center;
	}
</style>

<Accordion padding="0.3em 0.7em" margin="0.8em 0" let:show borderRadius="0">
	<div slot="control" class="flex">
		<Icon icon='grip-horizontal' cursor="grab" dragItem={true} fgColor="#666" size=1.5/>
		<Editable
			on:click={(e) => (field.name == '' ? show() : '')}
			bind:value={field.name}
			placeholder={field.type == 'title' ? 'Añade un título' : 'Añade una pregunta'} />
		{#if selected || field.type == 'title'}
			<Icon
				margin="0 5px"
				size="1.2"
				fgColor="#666"
				icon={!selected ? 'fonts' : selected.placeholder.icon} />
		{/if}
	</div>
	<div slot="content">
		{#if field.type != 'title'}
			<Grid column="50%" margin="10px 0" gap="10">
				<GridChild column="1" align="end" width="90%">
					{#if selected && selected.isMultiple === true}
						<Text title text="Respuestas:" margin="0 0 0.2em 0" />
						{#each field.options as option, i}
							<Group
								width="100%"
								direction="row"
								alignItems="center"
								margin="0 0 0.7em 0">
								{#if selected.type == 'checkbox'}
									<Checkbox disabled />
								{:else if selected.type == 'radio'}
									<Radio disabled />
								{/if}
								<Input bind:value={option} />
								<IconButton
									icon="x"
									size="1.5"
									on:click={() => deleteOption(option, i)} />
							</Group>
						{/each}
						<Button type="text" on:click={addOption}>+Agregar opción</Button>
					{:else if selected && selected.type === 'table'}
						"Master Detalle"
					{:else if selected && selected.isMultiple == false}
						<Placeholder
							icon={selected.placeholder.icon}
							text={selected.placeholder.text} />
					{/if}
				</GridChild>
				<GridChild column="2">
					<Select bind:value={selected} label="Selecciona campo">
						{#each fieldTypes as type}
							<Option value={type}>{type.label}</Option>
						{/each}
					</Select>
				</GridChild>
				{#if selected && selected.config}
					<GridChild column="1 / -1">
						{#each Object.keys(selected.config) as key}
							<Checkbox
								margin="10px 0"
								label={selected.config[key].label}
								bind:checked={selected.config[key].use} /><br>
							{#if selected.config[key].use == true}
								<Config {key} value={field.config[key]} on:change={e => assignConfig(key, e.detail)} on:destroy={e => deleteConfig(key)}/>
							{/if}
						{/each}
					</GridChild>
				{/if}
				<!-- TODO: Remove fields that have no compatible fields -->
				{#if hooks && selected && selected.hooks.compatible.length > 0}
				<GridChild column="1 / -1">
					<Checkbox label="Llenar {selected.isMultiple == true ? 'respuestas' : 'campo'} con conexión" bind:checked={connection}/>
					{#if connection == true}
						<!-- Only get hooks with compatible fields -->
						{#each hooks.filter(hookFilter(selected.hooks.compatible)) as hook}
						<!-- TODO:  select de conexion -->
						<h4>Conexión: {hook.title}</h4>
							<!-- show only compatible paths -->
							<!-- TODO: selected de campos basado en la conexión elegida -->
							{#each hook.template.keys as key}
								{#if selected.hooks.compatible.includes(key.type)}
									<p>Campo: {key.path}</p>
									<p>Tipo: {key.type}</p>
								{/if}
							{/each}
						{/each}
					{/if}
				</GridChild>
				{/if}
			</Grid>
		{:else}
			<TextArea
				rows="4"
				label="Agregar descripción (opcional)"
				bind:value={field.options[0]} />
		{/if}
		<Divider borderColor="#ccc" margin="10" />
		<Group direction="row" alignItems="center" justify="space-between">
			<Checkbox
				disabled={field.type == 'title' ? true : false}
				bind:checked={field.required}
				label="Obligatorio" />
			<Group direction="row" align="center">
				<IconButton size="1.5" icon="files" on:click={clone} />
				<IconButton size="1.5" icon="trash" on:click={del} />
			</Group>
		</Group>
	</div>
</Accordion>
