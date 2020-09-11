<script>
    import {
        Icon,
        Text,
        Group
    } from "Atoms";
    export let iconSize = 2;
    export let kpiSize = 2;
    export let descriptionSize = 0.8;

    export let fgColor = "#000";
    export let bgColor = "#15CEBC";
    export let kpiColor = "black"
    export let circled = false;
    export let padding = "";
    export let icon = '';
    export let weightTitle = 600
    export let kpi = ''
    export let descriptionColor = ''
    export let description = ''
</script>

<style>

</style>

<Group direction="row">
    <Icon {icon} {circled} size={iconSize} {fgColor} {bgColor} />
    <Group direction='column' width='100%' heigth='auto' alignItems='flex-start' padding="0 2em">
        <Text color={kpiColor} size={kpiSize} weight={weightTitle} title={true} text={kpi} align="left" padding=0></Text>
        <Text color={descriptionColor} size={descriptionSize} weight=400 text={description} padding=0></Text>
    </Group>
</Group>