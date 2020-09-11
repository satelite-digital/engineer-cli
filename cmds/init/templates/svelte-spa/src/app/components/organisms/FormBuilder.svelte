<script>
	//FormBuilder
	import { FormBuilderCard } from 'Organisms'

	import {
		Drag,
		Card,
		Divider,
		Group,
		IconButton,
		GridChild,
		Tooltip,
		Editable,
	} from 'Atoms'
	export let value
	export let name, description
	export let collection = []
	export let hooks
	if (value) {
		name = value.name
		description = value.description
		collection = value.fields
	}
	$: value = { name, description, fields: collection }
	function add(type = '') {
		collection = [
			...collection,
			{
				id: id(collection),
				name: '',
				type: type,
				required: false,
				options: [''],
				config: {},
			},
		]
	}
	function clone(field) {
		let c = JSON.parse(JSON.stringify(field)) //deep copy
		collection = [...collection, { ...c, id: id(collection) }]
	}
	function del(i) {
		collection.splice(i, 1)
		collection = collection
	}
	function id(array) {
		let i = Math.random().toString(36).substring(2)
		return array.find((e) => e.id == i) ? id(array) : i
	}
</script>

<style>
	.main {
		grid-area: main;
	}
	.left {
		grid-area: left;
	}
	.right {
		grid-area: right;
	}
	.container {
		display: grid;
		grid-template-columns: auto 65% auto;
		grid-template-rows: auto;
		grid-template-areas: 'left main right';
	}
</style>

<!-- Constructor de formularios -->
<main class="container">
	<div class="left" />

	<div class="main">
		<Card boxShadow="0 0 5px #ddd">
			<Editable
				maxlength="40"
				focus={false}
				placeholder="Nombre del formulario"
				size="1.8"
				weight="600"
				bind:value={name} />
			<Divider borderColor="#ccc" margin="10" />
			<Editable
				maxlength="80"
				focus={false}
				placeholder="Descripción del formulario"
				size="1"
				weight="400"
				bind:value={description} />
			<Divider borderColor="#ccc" margin="10" />
		</Card>
		<Drag bind:items={collection} let:index={i} let:item>
			<FormBuilderCard
				{hooks}
				bind:field={collection[i]}
				on:clone={(e) => clone(collection[i])}
				on:delete={(e) => del(i)} />
		</Drag>
		<Card
			boxShadow="0 0 5px #ddd"
			width="7em"
			padding="0.3em"
			margin="1em 0"
			float="right">
			<Group direction="row" placeContent="center">
				<Tooltip content="Agregar campo" placement="bottom">
					<IconButton
						circled
						padding="3px"
						size="1.2"
						icon="plus-circle"
						on:click={(e) => add()} />
				</Tooltip>
				<Tooltip content="Agregar título" placement="bottom">
					<IconButton
						circled
						padding="3px"
						size="1.2"
						icon="fonts"
						on:click={(e) => add('title')} />
				</Tooltip>
			</Group>
		</Card>
	</div>

	<div class="right" />
</main>
