<script>
    import { Group, IconButton, Dropdown, Divider, Text, Switch, UploadPhoto} from 'Atoms'
    import { User, IconText } from 'Molecules';
    export let user;

    let listActions = [{
        text: "Mis Borradores web(1)",
        action: () => {},
    }, 
    {
        text: "Pendiente de sincronizar(3)",
        action: () => {},
    },
    {
        text: "Cambiar contraseña",
        action: () => {},
    },
    {
        text: "Centro de ayuda",
        action: () => {},
    }]
</script>

<Group direction="column" width="300px" margin="1em 2em 1em 2em" slots="menu" alignItems="center" justify="center">
    <UploadPhoto image="https://images.unsplash.com/photo-1529778873920-4da4926a72c2?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80" />
    <Text color="#262626" size="1.13" text="Isabel Dubón" title={true} weight=600 />
    <Text color="#626262" size="1" text="i.dubon@pent.cloud"/>
</Group>
    <Divider width="auto" borderColor="#C6C6C6" />
<Group direction="column" width="300px" margin="1em 2em 1em 2em" slots="menu" alignItems="flex-start" justify="flex-start">   
    <Group direction="row" width="100%" placeContent="space-between" justify="space-between" alignItems="center" margin="1em 0 1em 0">
        <IconText text="Modo oscuro" icon="moon" circled={true} title={true} textPadding='0em 0em 0em 1em' weight="600" size="0.87" fgColor='white'></IconText>
        <Switch />
    </Group>
    <Group direction="column" width="100%">
        {#each listActions as item}
            <Text color="#7C7C7C" size="0.88" href={true} margin="1em 0 1em 0" text={item.text} on:click={item.action()} weight=400 /> 
        {/each}        
    </Group>
</Group>
<Divider width="auto" borderColor="#C6C6C6" />
<Group direction="column" width="300px" margin="1em 2em" slots="menu" alignItems="revert" justify="space-between" spaceContent="space-between">
    <Group direction="row">
        <Text color="#7C7C7C" size="0.88" padding="0.5em 0 0.5em 0" text="Powered by" weight=400 /> 
        <img width="90px" src="img/logo-pentcloud.svg" alt="">
    </Group>
</Group>