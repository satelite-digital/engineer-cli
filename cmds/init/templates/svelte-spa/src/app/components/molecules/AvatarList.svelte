<script>
  import { Avatar, Text } from "../atoms/index";
  export let items;
  export let maxItems = 0;
  export let borderRadius = "50px 50px";
  export let color = "#0000FF";
  export let padding = "0 0 0 10px";
  export let avatarSize = "2";
  export let textSize = "1";
    export let margin = "none";
  let style = `
    --pandding: ${padding};
    --margin: ${margin};
`;
</script>

<style>
  .avatar-list {
    display: flex;
    align-items: center;
    padding: var(--padding);
    margin: var(--margin);
  }
</style>

<div class="avatar-list" {style}>
  {#each items as item, i}
    {#if i <= maxItems - 1}
      <Avatar image={item} size={avatarSize} borderRadius={borderRadius} padding="0 0.3em 0 0"/>
    {/if}
  {/each}
  {#if items.length>maxItems}
    <Text weight="600" size={textSize} color={color} margin="0 0 0 0.8em">+{items.length - maxItems}</Text>
    {/if}
</div>
