<script>
  import { fly } from 'svelte/transition';
  import { getContext, onMount } from "svelte";
  import { Group, Card, CardItem, Text, IconButton, Divider, Dropdown, Icon, Button, Skeleton } from "Atoms"
  import { IconText, AvatarList, Kpi } from "Molecules";
  import { ModuleHeader, ModuleSidenav, FormCard } from "Organisms";
  import { Module } from "Templates";

  const { client, session} = getContext("services")
 
</script>

<Module>

  <section slot="header">
    <ModuleHeader page="Dashboard" icon="house-door" bgColor="#F7F7F7" padding="0em 0em 0em 0.4em" />
  </section>

  <section slot="nav">
    <ModuleSidenav />
  </section>

  <!-- <span slot="aside" /> -->

  <section slot="main" out:fly="{{ y: -200, duration: 500 }}" in:fly="{{ y: 200, duration: 500 }}">
    <h1>Home</h1>
  </section>
</Module>