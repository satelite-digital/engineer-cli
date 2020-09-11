<script>
  export let padding = "1em";
  export let margin = "0em";
  export let borderRadius = "0em";
  export let boxShadow = "0px 0px 15px rgba(100, 100, 100, 0.1);";
  export let background = "#fff";
  export let height = 'auto';
  export let width = 'auto';

  const style = `
        --padding:${padding};
        --margin:${margin};
        --boxShadow:${boxShadow};
        --borderRadius:${borderRadius};
        --background:${background};
        --width:${width};
        --height:${height};
    `;
</script>

<style>
  .card {
    width: var(--width);
    height: var(--height);
    background: var(--background);
    padding: var(--padding);
    margin: var(--margin);
    box-shadow: var(--boxShadow);
    border-radius: var(--borderRadius);
    transition: 0.2s ease-in;
    font-size: 1em;
    box-sizing: border-box;
  }
</style>

<div class="card" {style}>
  <slot />
</div>
