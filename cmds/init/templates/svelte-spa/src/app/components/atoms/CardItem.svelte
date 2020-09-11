<script>
  import Group from "./Group.svelte";
  export let padding = "0em";
  export let margin = "0em";
  export let borderRadius = "0em";
  export let layout = "none";
  export let boxShadow = "none";
  export let background = "#fff";
  export let h = "auto";
  export let w = "auto";
  export let display = "flex";
  export let widthContent = "calc(100% - 1em)";
  export let alignItemContent = "flex-start";
  export let alignItemHelper = "flex-start";
  export let placeContentGrid = "flex-start";
  export let placeContentHelper = "flex-start";

  export let widthHelper = "auto";
  const style = `
        --display:${display};
        --padding:${padding};
        --margin:${margin};
        --boxShadow:${boxShadow};
        --layout:${layout};
        --borderRadius:${borderRadius};
        --background:${background};
        --width:${w};
        --height:${h};
    `;
</script>

<style>
  .card-item {
    display: var(--display);
    width: var(--width);
    height: var(--height);
    background: var(--background);
    padding: var(--padding);
    margin: var(--margin);
    box-shadow: var(--boxShadow);
    border-radius: var(--borderRadius);
  }
</style>

<div class="card-item" {style}>
  <Group direction="column" width={widthContent} alignItems={alignItemContent}  placeContent={placeContentGrid}>
    <slot name="content" />
  </Group>
  <Group width={widthHelper} alignItems={alignItemHelper} placeContent={placeContentHelper}>
    <slot name="helper" />
  </Group>
</div>
