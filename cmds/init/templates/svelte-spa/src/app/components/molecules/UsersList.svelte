<script>
	let avatarSize = 2.4;
	import { User } from "Molecules";
	export let collection = [];
	function removeItem(user) {
		let index = -1, i = -1;
		collection.forEach((item) => {
			index++;
			if (item.id == user.id) {
				i = index;
			}
		});
		if (i > -1) {
			collection.splice(i, 1);
			collection = collection;
		}
	}
</script>

<style>
	.element {
		display: flex;
		flex-direction: "row";
		justify-content: space-between;
		margin: 15px 0;
	}
</style>

<main>
	{#each collection as user}
		<div class="element">
			<User
				{avatarSize}
				margin="0em 0em 0em 0em"
				username={user.username}
				email={user.email} />
			<sl-icon-button name="trash" on:click={e => removeItem(user)}></sl-icon-button>
		</div>
	{/each}
</main>
