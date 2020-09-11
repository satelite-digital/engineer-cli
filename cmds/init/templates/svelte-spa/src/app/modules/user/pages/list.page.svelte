<script>
    import { fly } from 'svelte/transition';
    import { getContext, onMount } from "svelte";
    import { Group, Card, Text, Button, Skeleton, CardItem, Divider, Dropdown, Dialog, Input, Toast } from "Atoms";
    import { ModuleHeader, ModuleSidenav } from "Organisms";
    import { IconText, AvatarList, Kpi, SearchBar, FabButton } from "Molecules";
    import { Module } from "Templates";
    
    const { client, session } = getContext("services");
    
</script>

<!-- modulo -->
<Module>
    <section slot="header">
        <ModuleHeader page="User" icon="clipboard" bgColor="#F7F7F7" padding="0em 0em 0em 0.4em" />
    </section>

    <section slot="nav">
        <ModuleSidenav />
    </section>

    <section slot="main" out:fly="{ { y: -200, duration: 500 } }" in:fly="{ { y: 200, duration: 500 } }"> 
        <h1>User</h1>
    </section>
</Module>
