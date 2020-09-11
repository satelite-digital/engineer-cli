<script>
  export let size = "1";
  export let image = "https://images.unsplash.com/photo-1529778873920-4da4926a72c2?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80";
  export let alt = "";
  export let borderRadius = "none";
  export let padding= "none"; 
  size = parseFloat(size);

  let style = `
    --size:${size}em;
    --borderRadius:${borderRadius};
    --padding:${padding};
    `;
</script>

<style>
  .avatar {
    --size: var(--size);
    padding: var(--padding);

  }
  .avatar::part(base) {
    border-radius: var(--borderRadius);
  }
</style>

<sl-avatar class="avatar" {style} {image} {alt} />
