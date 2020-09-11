<script>

  document.body.style.display = "grid";
  document.body.style.padding = "0px";

  function myFunction(x) {
    if (x.matches) {
      // If media query matches
      document.body.style.gridTemplateColumns = "1fr";
      document.body.style.gridTemplateRows = "8em 8em";
      document.body.style.height = "100%";
      document.body.style.gridTemplateAreas = `
                                                "nav"
										                        	 	"header"
                                                "content"
											`;
    } else {
      document.body.style.gridTemplateColumns = "8em 1fr";
      document.body.style.gridTemplateRows = "8em 1fr";
      document.body.style.height = "100%";
      document.body.style.gridTemplateAreas = `
											 "nav header"
											 "nav content"
											`;
    }
  }

  var x = window.matchMedia("(max-width: 700px)");
  myFunction(x); // Call listener function at run time
  x.addListener(myFunction); // Attach listener function on state changes

  export let divider = true
  let headerStyle=""
  let mainStyle=''
  if(!divider){
    headerStyle = 'border-bottom:none;'
    mainStyle = 'padding:0'
  }
</script>

<style>
  /* items */

  header,
  main {
    color: #262626;
    /* padding: 3em; */
    /* font-size: 20px; */
  }

  nav {
    color: #A8A8A8;
    font-size: 20px;
    padding: none;
    grid-area: nav;
    width: auto;
    display: grid;
    box-sizing:border-box;
  }

  /* specific item styles */

  header {
    background: #F7F7F7;
    grid-area: header;
    border-bottom: 2px solid rgba(78, 78, 255, 0.1);
    display: grid;
    height: auto;
    padding: 0em 3em;
    border-radius: 2em 0em 0em 0em;
    box-sizing:border-box;
  }

  main {
    grid-area: content;
    width: 100%;
    height: auto;
    display: grid;
    background: #F7F7F7;
    overflow: scroll;
    padding:4em;
    box-sizing:border-box;
  }

  ::-webkit-scrollbar {
    height: 0;
    width: 5px;
  }
  ::-webkit-scrollbar-track {
    width: 5px;
    background: #ddd;
  }
  ::-webkit-scrollbar-thumb {
    width: 5px;
    background: var(--primary, #666);
  }

</style>

<header style={headerStyle}>
  <slot name="header" />
</header>

<nav>
  <slot name="nav" />
</nav>

<main style={mainStyle}>
  <slot name="main" />
</main>
