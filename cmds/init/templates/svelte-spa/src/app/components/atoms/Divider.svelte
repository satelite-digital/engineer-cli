<script>
  export let borderColor = ""
  export let orientation = "horizontal"
  export let border = "0.22px solid"
  export let margin = "0em"
  export let padding = "0em"
  export let width = "100%"
  export let height = "auto"

  if (orientation == "vertical") {
    width = "0";
    height = "100%";
  }

  const style = `
    --borderColor:${borderColor};
		--width:${width};
		--height:${height};
    --border:${border};
    margin:${margin};
    padding:${padding};
    `
</script>

<style>
  .divider {
    border: var(--border);
    border-color: var(--borderColor);
    width: var(--width);
    height: var(--height);
  }
</style>

<hr class="divider" {style} />