<script>
	import { User } from "Molecules";
	export let collection = [];
	export let selected = [];
	let avatarSize = 2.4;
	let searchTerm = "";
	let filteredList = collection;
	let showPanel = false;

	function show() {
		showPanel = true;
	}

	function hide() {
		showPanel = false;
	}

	function filter(e) {
		searchTerm = e.target.value;
		filteredList = collection.filter(
			(item) =>
				item.username.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1
		);
	}

	function values(user) {
		let index = -1,
			i = -1;
		selected.forEach((item) => {
			index++;
			if (item.id == user.id) {
				i = index;
			}
		});
		if (i == -1) {
			selected = [...selected, user];
		}
	}
</script>

<style>
	.main {
		background-color: #fff;
	}

	.dropdown-content {
		display: block;
		position: absolute;
		background-color: #fff;
		min-width: 160px;
		overflow: auto;
		box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
		z-index: 1;
		width: 100%;
	}

	.dropdown {
		position: relative;
		display: inline-block;
		width: 100%;
	}
</style>

<main class="main">
	<div class="dropdown">
		<sl-input
			value={searchTerm}
			on:slBlur={hide}
			on:slFocus={show}
			on:input={filter}
			on:slChange={filter}
			caret
			clearable />
		<div class="dropdown-content">
			{#if showPanel == true}
				<sl-menu>
					{#each filteredList as user}
						<sl-menu-item on:click={(e) => values(user)}>
							<User
								{avatarSize}
								margin="0em 0em 0em 0em"
								username={user.username}
								email={user.email} />
						</sl-menu-item>
					{/each}
				</sl-menu>
			{/if}
		</div>
	</div>
</main>
