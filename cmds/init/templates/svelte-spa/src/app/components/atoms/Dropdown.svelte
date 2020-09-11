<script>
  export let placement = 'bottom-start';
  export let distance = 0;
  export let skidding = 0;
  export let hoist = true;
  export let width = "auto";
  export let height = "auto";
  export let overflow = "auto";
  export let overflowX = "auto";
  export let overflowY = "auto";
  export let maxHeight = "auto";
  export let alignItems = "center";
  export let justifyContent = "center";
  export let placeContent = "center";

  distance = parseInt(distance);
  skidding = parseInt(skidding);

  let style = `
    --width:${width};
    --height:${height};
    --overflow:${overflow};
    --overflow-x:${overflowX};
    --overflow-y:${overflowY};
    --max-height:${maxHeight};
    display:flex;
    justify-content:${justifyContent};
    align-items:${alignItems};
    place-content:${placeContent};
  `

</script>

<style>
  .dropdown::part(panel) {
    width: var(--width);
    height: var(--height);
    overflow-y: var(--overflowY);
    overflow-x: var(--overflowX);
    overflow: var(--overflow);
    max-height: var(--maxHeight);
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

<sl-dropdown class="dropdown" {placement} {skidding} {distance} {style}>
  <div slot="trigger">
    <slot name="button" />
  </div>
  <div class="menu">
    <slot name="menu" />
  </div>
</sl-dropdown>
