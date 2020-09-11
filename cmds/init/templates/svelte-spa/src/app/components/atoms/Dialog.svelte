<script>
  export let name = "dialog-overview";
  export let title = "Dialog";
  export let width = "800px";
  export let dialog = {}
  let style = `--width:${width}`
</script>

<style>
  .dialog::part(panel) {
    border-radius: 1em;
    padding: 2em 1em;
  }

  .dialog::part(close-button){
    border: 2px solid #8D8D8D;
    border-radius: 50%;
    width: 1em;
    height: 1em;
    padding: 0;
    place-content: center;
  }

  .dialog::part(header){
    align-items: center;
    padding: 0 1em
  }

  .dialog::part(title){
    font-size: 1.5em;
    font-weight: 600;
    padding: 0
  }

  .dialog::part(overlay){
    background: #161616;
    opacity: 0.4;
  }

  .dialog::part(body){
    padding: 2em 1em
  }

  .dialog::part(footer){
    padding: 0 1em
  }
</style>

<sl-dialog label={title} class="dialog {name}" {style} bind:this={dialog}>
  <div>
    <slot name="content"></slot>
  </div>
  <div slot="footer">
    <slot name="footer" />
  </div>
</sl-dialog>
