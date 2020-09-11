<script>
  import { Group, IconButton, Divider, Tooltip } from "Atoms";
  import { User, IconText } from "Molecules";
  export let bgColor = "transparent";
  export let padding = "none";
  export let logo = "img/logo.svg";
  export let widthLogo = "65px";
  export let paddingLogo = "0em";
  import {push, pop, replace} from 'svelte-spa-router'
  export let items = [
    {
      type: "item",
      title: "Inicio",
      route: '/home',
      icon: "house-door",
      circled: true,
      bgColor: "rgba(21, 206, 188, 0.15);",
      fgColor: "#15CEBC",
      size: 1
    },
    {
      type: "item",
      title: "Blog",
      route: '/blog',
      icon: "clipboard",
      circled: false,
      bgColor: "rgba(21, 206, 188, 0.15);",
      fgColor: "#15CEBC",
      size: 1
    },
    {
      type: "item",
      title: "Post",
      route: '/post',
      icon: "clipboard",
      circled: false,
      bgColor: "rgba(21, 206, 188, 0.15);",
      fgColor: "#15CEBC",
      size: 1
    },
    {
      type: "item",
      title: "Editor",
      route: '/editor',
      icon: "clipboard",
      circled: false,
      bgColor: "rgba(21, 206, 188, 0.15);",
      fgColor: "#15CEBC",
      size: 1
    },
    {
      type: "item",
      title: "PostLog",
      route: '/post_log',
      icon: "clipboard",
      circled: false,
      bgColor: "rgba(21, 206, 188, 0.15);",
      fgColor: "#15CEBC",
      size: 1
    },
    {
      type: "divider"
    },
    {
      type: "item",
      title: "Reportes",
      route: '/report',
      icon: "pie-chart",
      circled: false,
      size: 1
    },
    {
      type: "item",
      title: "Usuarios",
      route: '/users',
      icon: "people",
      circled: false,
      size: 1
    }
  ];
</script>

<style>
  hr {
    border: 1px solid #c6c6c6;
    width: 100%;
  }
</style>

<Group direction="column" justify="flex-start" alignItems="center" placeContent="start" width="100%" height="100%" {bgColor} {padding}>
  <Group justify="flex-start" alignItems="center" placeContent="center" height="6.3em"> <img src={logo} alt="SpaceSuite" style="width:{widthLogo};padding:{paddingLogo}" />
  </Group>
  <Group placeContent="start space-evenly" height="100%" margin="0">
    {#each items as { type, icon, circled, bgColor, fgColor, size, title, route }}
      {#if type == 'item'}
        <Tooltip content={title}>
            <IconButton {icon} circled={true} {size} type="link" href={route}/>
        </Tooltip>
      {:else if type == 'divider'}
        <Divider orientation="horizontal" borderColor="#C6C6C6" margin="0"/>
      {/if}
    {/each}
    <Tooltip content="Cerrar sesión">
        <IconButton icon="power" circled={true} size=1 on:click={()=>{ localStorage.removeItem('session'); push('/login') }}></IconButton>
    </Tooltip>
  </Group>
</Group>
