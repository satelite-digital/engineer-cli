<script>
    import { Avatar, Text } from 'Atoms'
    export let size = 1
    export let avatarSize = 1
    export let textColor = 'black'
    export let margin = 'auto'

    $: smaller = `${size * 0.8}em`

    size = parseInt(size)
    let style = `--color:${textColor};--margin:${margin}`

    export let username = ''
    export let email = ''
    
</script>

<style>
    .User{
        display:flex;
        flex-direction: row;
        color: var(--color);
        margin: var(--margin);
        align-items: center;
    }
    
    .UserData{
        display:flex;
        margin-left:1em;
        flex-direction: column;
        color: var(--color);
    }   
</style>

<div class="User" {style}>
    <Avatar size={avatarSize} borderRadius="50px"></Avatar>
    <div class="UserData">
        <Text color={textColor} {size} text={username} title={true} weight=600></Text>
        <Text color={textColor} size={smaller} text={email}></Text>
    </div>
</div>