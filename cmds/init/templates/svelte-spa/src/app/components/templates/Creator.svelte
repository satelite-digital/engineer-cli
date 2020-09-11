<style>
	main {
		background-color: #f4f4f4;
		padding: 0;
		height: 100vh;
		width: 100vw;
		position: absolute;
		top: 0;
		left: 0;
	}
	.top {
		position: fixed;
		width: 100vw;
		height: 25vh;
		top: 0;
		background: white;
		padding: 0;
		/* z-index: 2; */
		left: 0;
		border-radius: 0 0 15px 15px;
		box-shadow: 0 0 5px #ddd;
		overflow: auto;
	}
	.contents {
		position: fixed;
		/* z-index: 1; */
		width: calc(100vw - 40px);
		padding: 20px;
		top: 25vh;
		height: calc(75vh - 40px);
		left: 0;
		overflow: auto;
	}
	::-webkit-scrollbar {
		height: 0;
		width: 0;
	}
	::-webkit-scrollbar-track {
		width: 0;
		background: #ddd;
	}
	::-webkit-scrollbar-thumb {
		width: 0;
		background: var(--primary, #666);
	}
	.contents::-webkit-scrollbar {
		height: 5px;
		width: 5px;
	}
	.contents::-webkit-scrollbar-track {
		width: 5px;
		background: #ddd;
	}
	.contents::-webkit-scrollbar-thumb {
		width: 5px;
		background: var(--primary, #666);
	}
</style>

<main>
	<div class="top">
		<slot name="top" />
	</div>
	<div class="contents">
		<slot name="main" />
	</div>
</main>
