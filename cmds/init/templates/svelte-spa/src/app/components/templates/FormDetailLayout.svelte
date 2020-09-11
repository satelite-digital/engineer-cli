<style>
	/* Grid */

	/* Small devices (landscape phones, 576px and up) */
	.detailForm {
		display: grid;
		width: 100%;
		grid-template-rows: auto;
		grid-gap: 1em;
		grid-template-areas:
			"detail"
			"filters"
			"tabs"
			"content";
	}


	/* Large devices (desktops, 992px and up) */
	@media (min-width: 992px) {  
		.detailForm {
			display: grid;
			width: 100%;
			grid-template-columns: repeat(2, 1fr);
			grid-template-rows: auto;
			grid-gap: 1em;
			grid-template-areas:"detail filters"
								"tabs tabs"
								"content content"
		}
	}

	/* items */

	.detailForm div {
		color: black;
		/* font-size: 20px; */
		/* padding: 20px; */
	}

	/* specific item styles */

	.detail {
		/* background: #b10c9d; */
		grid-area: detail;
		padding: 0 4em;
	}

	.filters {
		/* background: #dd0; */
		grid-area: filters;
		padding: 0 4em;
	}

	.tabs {
		/* background: #e01fd0; */
		grid-area: tabs;
		padding: 0;
		/* border-bottom: 2px solid rgba(78, 78, 255, 0.1); */
		box-shadow :inset 0 -3px 0 rgb(227 232 232);
		justify-content: center;
    	display: flex;
		min-height: 55px;
	}

	.content {
		/* background: #000fff; */
		grid-area: content;
		padding: 3em 4em 3em;
	}



</style>


<section class="detailForm">
	<div class="detail">
		<slot name="detail" />
	</div>
	<div class='filters'>
		<slot name="filters" />
	</div>
	<div class='tabs'>
		<slot name="tabs" />
	</div>
	<div class='content'>
		<slot name="content" />
	</div>
</section>