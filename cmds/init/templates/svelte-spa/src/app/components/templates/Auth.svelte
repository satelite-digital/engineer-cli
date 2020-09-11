<script>

  export let backgroundURL;
  let style = 'background: #F7F7F7';


  if(backgroundURL){
     style = `background: transparent url("${backgroundURL}") no-repeat fixed center;`
  }


  document.body.style.display = "flex";
  document.body.style.padding = "0px";

  document.body.style.gridTemplateColumns = null;
  document.body.style.gridTemplateRows = null;
  document.body.style.height = "100%";
  document.body.style.gridTemplateAreas = null;
    
</script>

<style>

  main {
    width: 100%;
    height: auto;
    display: flex;
    justify-content: center;
    align-items:center;
    align-content:center;
    color: #262626;
    overflow: auto;
    background-size:cover;
  }


</style>

<main {style}>
  <slot/>
</main>
