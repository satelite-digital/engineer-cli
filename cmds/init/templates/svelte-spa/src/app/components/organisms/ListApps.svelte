<script>
    import { Group, IconButton, Dropdown, Divider, Text, Switch, UploadPhoto, Tooltip} from 'Atoms'
    import { User, IconText } from 'Molecules';

    let apps = [{
        icon: 'icons/icono-formspace.svg',
        text: "Salespace",
        action: () => {},
    }, 
    {
        icon: `icons/icono-salespace.svg`,
        text: "Trackspace",
        action: () => {},
    },
    {
        icon: `icons/icono-trackspace.svg`,
        text: "Formspace",
        action: () => {},
    }]
</script>

<Group direction="row" width="300px" margin="1em 2em 1em 2em" slots="menu" alignItems="center" justify="space-around" placeContent="space-around">
    {#each apps as item}
          <IconButton src={item.icon} size="3" padding="none"/>
    {/each}  
</Group>