<script>
  import { Icon, Text, Group } from "Atoms";
  export let size = 1;

  export let fgColor = "#000";
  export let bgColor = "#15CEBC";
  export let text = "";
  export let textColor = "black"
  export let circled = false;
  export let title = false
  export let margin = "none";
  export let padding = "";
  export let iconPadding = "0em";
  export let textPadding = "0em 0em 0em 0.5em";
  export let icon ='';
  export let weight = 400
  export let href = false;
  export let subtitle = ''
  export let subtitleSize = 1
  export let route = false
  // export let textPadding = "0em 0em 0em 0em"
  size = parseFloat(size);
  let style = `
  --line-height:${size}em;
  --margin:${margin};
  --padding:${padding};
  align-items:${subtitle == '' ? 'center' : 'flex-start'};`;
  // style = `${style};--align-items:flex-start` && subtitle != ''
</script>


<style>
  .icon-text {
    display: flex;
    flex-direction: row;
    line-height: var(--line-height);
    margin: var(--margin);
    padding: var(--padding);
    align-items: center;
  }
</style>

<div class="icon-text" {style}>
    <!-- add subtitle -->
    {#if subtitle == ''}
      <Icon {icon} {circled} size={size} {fgColor} {bgColor} padding={iconPadding}></Icon>
      <Text color={textColor} {size} {weight} padding={textPadding} {title} {route} {href} {text} ></Text>
    {:else}
      <Icon {icon} {circled} size={size} {fgColor} {bgColor} padding={iconPadding} alignItems="flex-start"></Icon>
      <Group direction="column" padding={textPadding}>
        <Text color={textColor} {size} {weight} {title} {route} {href} {text} ></Text>
        <Text color={textColor} size="{subtitleSize}" padding="0.5em 0 0 0" text={subtitle} ></Text>
      </Group>
    {/if}
</div>
