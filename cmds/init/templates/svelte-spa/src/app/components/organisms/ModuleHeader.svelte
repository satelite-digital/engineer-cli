<script>
    import { getContext } from "svelte";
    import { Group, IconButton, Dropdown, Divider, Text, Switch, UploadPhoto, CardItem} from 'Atoms'
    import { User, IconText } from 'Molecules';
    import { ProfileUser, ListApps } from 'Organisms';
    export let page = ""
    export let icon = ''
    export let bgColor = 'transparent'
    export let padding = '0em 0em'
    export let username = 'Isabel Dubón'
    export let email = 'i.dubon@pent.cloud'
    let avatarSize = 2.4


  const { session } = getContext("services");
  const user = session.getSession().user
</script>

<Group direction="row" justify="space-between" alignItems='center' height="100%" {bgColor} {padding}>

    <IconText text={page} {icon} circled={true} title={true} textPadding='0em 0em 0em 1em' weight="600" size="1.4" fgColor='white'></IconText>

    <Group direction="row">
        <!-- Dropdown apps -->
        <Dropdown distance="60" skidding="120">
            <div slot="button">
        <IconButton size="1.6" icon="bell" padding="0 .4em 0 .4em" ></IconButton>
            </div>
            <div slot="menu" style="overflow: hidden;">
               <Group width="300px" margin="1em 2em 1em 2em" slots="menu" alignItems="center" justify="center">
                {#each [0,1,2,3,4] as notification}
                    <Text color="#626262" size=0.85 text="cambios actualizados del form {notification}" weight=400/>
                {/each}
               </Group>
            </div>
        </Dropdown>
        <!-- Dropdown apps -->
        <Dropdown distance="60" skidding="140">
            <div slot="button">
        <IconButton size="1.6" icon="grid-3x3-gap" padding="0 .4em 0 .4em" ></IconButton>
            </div>
            <div slot="menu" style="overflow: hidden;">
                <ListApps />
            </div>
        </Dropdown>
        <User {avatarSize} margin="0em 0em 0em 2em" username={user.name} email={user.email}></User>
        <!-- Profile User -->
         <Dropdown distance="60" skidding="5">
            <div slot="button">
                <IconButton size="1.2" icon="chevron-down" padding="0 .4em 0.4em .8em" ></IconButton>
            </div>
            <div slot="menu" style="overflow: hidden;">
                <ProfileUser />
            </div>
        </Dropdown>
    </Group>

</Group>