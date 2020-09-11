<script>
	//TODO: label a eliminar conexion y de agregar params,headers,etc.
	//TODO: Tabla de template y modal en respuesta (boton de entendido)
	//TODO: Instrucciones de campos de respuesta
	// https://script.google.com/macros/s/AKfycbymwyVBIZ2AedT0mpy1d7XOCFTelnrdU3V8xT5rU15CdGq8-giE/exec?type=object
	import {
		Select,
		Dialog,
		Tabs,
		Table,
		Option,
		Divider,
		Input,
		Group,
		Grid,
		Tooltip,
		GridChild,
		Accordion,
		Button,
		Editable,
		IconButton,
	} from 'Atoms'
	import { FormHook } from 'Helpers'
	import { createEventDispatcher, tick } from 'svelte'
	import hookTypes from './hookTypes.json'
	import hookErrors from './hookErrors.json'
	const dispatch = createEventDispatcher()
	export let hook
	let types = [
		{ label: 'Lectura', methods: ['GET', 'POST'], type: 'READ' },
		{
			label: 'Escritura',
			methods: ['POST', 'PUT', 'DELETE', 'PATCH'],
			type: 'WRITE',
		},
	]
	let headers = {
		path: 'Propiedad',
		type: 'Tipo',
		compatible: 'Campos compatibles',
	}
	let methods
	let type
	let responseModal
	let loading
	let tabs = {
		get: ['Parámetros', 'Headers', 'Respuesta'],
		write: ['Parámetros', 'Headers', 'Body', 'Respuesta'],
	}
	let tab = 0
	let response
	let error
	$: {
		let temp = types.find((e) => e.type == hook.type)
		if (temp) {
			methods = temp.methods
		}
	}
	$: {
		if (response && !response.template.error) {
			hook.template = response.template
		} else if (response && response.template.error) {
			error = response.template.type
			hook.template = {}
		}
	}


	async function testHook() {
		try {
			loading = true
			error = null
			response = null
			response = await hook.testHook()
			await tick()
			responseModal.show()
			hook.method != "GET" ? tab = 3 : tab = 2
			
			loading = false
		} catch (err) {
			error = 'Error con el servidor'
			response = null
			loading = false
		}
	}
</script>

<style>
	main {
		position: relative;
		width: 65vw;
		margin: 0.6em 0;
		left: 17.5vw;
	}
	type,
	headers,
	method,
	endpoint,
	params,
	headers,
	data {
		display: contents;
	}
	.content {
		padding: 1em 2em 3em;
	}
	.error {
		color: red;
		white-space: pre-line;
		font-size: 0.8em;
	}
	.delete {
		position: absolute;
		bottom: 0.9em;
		right: 0.9em;
	}
	.response {
		overflow: auto;
	}
	.response::-webkit-scrollbar {
		height: 5px;
		width: 5px;
	}
	.response::-webkit-scrollbar-track {
		width: 5px;
		background: #ddd;
	}
	.response::-webkit-scrollbar-thumb {
		width: 5px;
		background: var(--primary, #666);
	}
	.response p {
		font-size: 0.8em;
		white-space: pre-line;
	}
	.response span {
		font-size: 0.7em;
	}
	pre{
		font-size: 0.9em;
	}
</style>

{#if hook}
	<main>
		<Accordion let:show borderRadius="3">
			<div slot="control">
				<Editable
					padding="0.4em 2em"
					margin="10px 0"
					on:focus={show}
					placeholder="Nombre de conexión"
					bind:value={hook.title} />
			</div>
			<div class="content" slot="content">
				<type>
					<Select margin="10px 0" label="Tipo de conexión" bind:value={hook.type}>
						{#each types as t}
							<Option value={t.type}>{t.label}</Option>
						{/each}
					</Select>
				</type>
				<method>
					{#if methods && methods.length}
						<Select
							margin="10px 0"
							label="Método"
							placeholder="Método"
							bind:value={hook.method}>
							{#each methods as method}
								<Option value={method}>{method}</Option>
							{/each}
						</Select>
					{/if}
				</method>
				<endpoint>
					<Group direction="row" margin="0.4em 0">
						<Input
							margin="0 2px"
							width="80%"
							placeholder="Escribe una URL"
							bind:value={hook.endpoint} />
						<Button bind:loading on:click={testHook}>Probar URL</Button>
					</Group>
				</endpoint>
				{#if hook.type}
					<Tabs tabs={hook.method == 'GET' ? tabs.get : tabs.write} bind:tab />
				{/if}
				{#if tab == 0}
					<params>
						<Grid explicit columns="auto auto 50px" gap="10" margin="0.8em">
							<GridChild column="1 / -1" justify="start">
								<Button colorText="#444" on:click={() => (hook = hook.addParam())}>
									Agregar parámetro
								</Button>
							</GridChild>
							<GridChild column="1 / -1" justify="start" width="100%">
								<Divider borderColor="#666" margin="0.3em 0" />
							</GridChild>
							{#each hook.params as param, i}
								<Input margin="10px 0" bind:value={param.key} placeholder="Propiedad" />
								<Input margin="10px 0" bind:value={param.value} placeholder="Valor" />
								<GridChild align="center" justify="center">
									<IconButton
										on:click={() => (hook = hook.removeParam(i))}
										padding="4px"
										icon="x-square"
										size="1.2"
										circled />
								</GridChild>
							{/each}
						</Grid>
					</params>
				{:else if tab == 1}
					<headers>
						<Grid explicit columns="auto auto 50px" gap="10" margin="0.8em">
							<GridChild column="1 / -1" justify="start">
								<Button colorText="#444" on:click={() => (hook = hook.addHeader())}>
									Agregar encabezado
								</Button>
							</GridChild>
							<GridChild column="1 / -1" justify="start" width="100%">
								<Divider borderColor="#666" margin="0.3em 0" />
							</GridChild>
							{#each hook.headers as header, i}
								<Input
									margin="10px 0"
									bind:value={header.key}
									placeholder="Propiedad" />
								<Input margin="10px 0" bind:value={header.value} placeholder="Valor" />
								<GridChild align="center" justify="center">
									<IconButton
										on:click={() => (hook = hook.removeHeader(i))}
										padding="4px"
										icon="x-square"
										size="1.2"
										circled />
								</GridChild>
							{/each}
						</Grid>
					</headers>
				{:else if (tab == 2 && hook.method == 'GET') || (tab == 3 && hook.method != 'GET')}
					<div class="response">
						{#if hook.template}
							<h3>Conexiones disponibles</h3>
							<p>
								{`
									Utiliza conexiones de lectura para llenar información en un campo de valor único (texto, párrafo, número, etc.) u opciones de selección (listado, listado múltiple, selección única, etc.) automáticamente cada vez que un usuario va a llenar un formulario. 
									
									La respuesta de tu webservice o API retorna los siguientes campos:
								`}
							</p>
							{#if hook.template.keys}
								<Table
									style="width: minmax(400px, 100%)"
									{headers}
									data={hook.template.keys}
									let:row
									let:key
									alternate="#f4f4f4"
									td="padding: 10px; width: max(170px);"
									th="border-bottom: solid 1px #ddd">
									{#if key == 'compatible'}
										{hookTypes[row.type].join(', ')}
									{:else}{row[key]}{/if}
								</Table>
							{/if}
							<span>
								*El campo tipo date/string significa que la respuesta puede ser convertida a un campo tipo fecha sin errores.
							</span>
							{#if error}
								<p class="error">
									{`El formato de la respuesta no es compatible: 
							${hookErrors[error]}
							`}
								</p>
							{/if}
							<!-- <pre>{JSON.stringify(response.template, null, 2)}</pre> -->
						{/if}
					</div>
				{:else if tab == 2 && hook.method != 'GET'}
					<data>
						<Grid explicit columns="auto auto 50px" gap="10" margin="0.8em">
							<GridChild column="1 / -1" justify="start">
								<Button colorText="#444" on:click={() => (hook = hook.addBody())}>
									Agregar propiedad
								</Button>
							</GridChild>
							<GridChild column="1 / -1" justify="start" width="100%">
								<Divider borderColor="#666" margin="0.3em 0" />
							</GridChild>
							{#each hook.body as body, i}
								<Input margin="10px 0" bind:value={body.key} placeholder="Propiedad" />
								<Input margin="10px 0" bind:value={body.value} placeholder="Valor" />
								<GridChild align="center" justify="center">
									<IconButton
										on:click={() => (hook = hook.removeBody(i))}
										padding="4px"
										icon="x-square"
										size="1.2"
										circled />
								</GridChild>
							{/each}
						</Grid>
					</data>
				{/if}
				<div class="delete">
					<Button
						colorText="var(--formspace-primary)"
						type="text"
						iconLeft="trash"
						on:click={(e) => dispatch('delete', '')}>
						Eliminar conexión
					</Button>
				</div>
			</div>
		</Accordion>
		{#if response}
			<Dialog title="Respuesta de webservice o API" bind:dialog={responseModal}>
				<div slot="content">
					<p>
						La petición ha retornado la siguiente información. 
						
						Si tu conexión es de lectura puedes asignar valores compatibles a diferentes campos de tu formulario. 

						Si tu conexión es de escritura puedes asignar las respuestas del formulario a las propiedades que eligas en la configuración del 'Body'.
					</p>
					<pre>{JSON.stringify(response.result, null, 2)}</pre>
				</div>
			</Dialog>
		{/if}
	</main>
{/if}
