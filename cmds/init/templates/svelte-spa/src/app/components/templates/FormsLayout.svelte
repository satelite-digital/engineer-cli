<script>
</script>

<style>
/* Grid */

	/* Small devices (landscape phones, 576px and up) */
	.grid-1 {
	display: grid;
	width: 100%;
	grid-template-columns: (2, 1fr);
	grid-template-rows: 100px 100px ;
	grid-gap: 16px;

	grid-template-areas: "filter switch"
							"search search"
							"content content"
	}


	/* Large devices (desktops, 992px and up) */
	@media (min-width: 992px) {  
		.grid-1 {
		display: grid;
		width: 100%;
		grid-template-columns: repeat(3, 1fr);
		grid-template-rows: auto;
		grid-gap: 16px;

		grid-template-areas: "filter search switch"
								"content content content"
		}
	}

	/* items */

	.grid-1 div {
		/* color: white;
		font-size: 20px;
		padding: 20px; */
	}

	/* specific item styles */

	.filter {
		/* background: #b03532; */
		grid-area: filter;
		display: flex;
    	align-items: center;
	}
	
	.search {
		/* background: #b03532; */
		grid-area: search;
		display: flex;
		align-items: center;
    	justify-content: center;
	}
	
	.switch {
		/* background: #b03532; */
		grid-area: switch;
		display: flex;
		align-items: center;
		justify-content: flex-end;
	}

	.content {
		/* background: #33a8a5; */
		grid-area: content;
		margin-top:3em
		
	}
	
	.fabContainer{
		/* background:#0000ff; */
		position:absolute;
		bottom :3em;
		right :3em;
		height:200px;
		width:100px
	}
	
</style>


<section class="grid-1">
	<div class="filter">
		<slot name="filter" />
	</div>
	<div class="search">
		<slot name="search" />
	</div>
	<div class="switch">
		<slot name="switch" />
	</div>
	<div class="content">
		<slot name="content" />
	</div>
</section>
<div class="fabContainer">
	<slot name="fab" />
</div>