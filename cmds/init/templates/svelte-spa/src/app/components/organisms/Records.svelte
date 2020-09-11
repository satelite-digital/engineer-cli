<script>
    import { Group, Card, Text, Avatar, Divider } from "Atoms"
    import { IconText } from "Molecules"
    // import { Clusterize } from 'Clusterize'
    import { fly } from 'svelte/transition'
    export let transition = {
        out: { x: -200, duration: 500 },
        in : { x: 200, duration: 500 }
    }
    export let form
</script>

<style>
    .headerSkeleton{
        padding: 0 0 1em 0;
        border-bottom: 3px solid rgba(13, 60, 255, 0.15);
    }

    .tableHeader{
        width: 100%;
        margin: 0 0 1em 0;
    }

    .tableRow{

    }
</style>

<div out:fly="{transition.out}" in:fly="{transition.in}">
    <Card padding="1em 2em" borderRadius="0.5em">
        <!-- <Group direction="row" padding="0 0 1em 0" >
            {#each [0, 1, 2, 3, 4] as i}
                <Skeleton width="calc(20% - 1em)" />
            {/each}
        </Group>
        <Divider borderColor="rgba(13, 60, 255, 0.15);"/>
        {#each new Array(5) as i}
        <Group direction="row" padding="0 0 1em 0" margin="2em 0">
            {#each [0, 1, 2, 3, 4] as i}
                <Skeleton width="calc(20% - 1em)" />
            {/each}
        </Group>
        {/each} -->
        <div class="clusterize">
            <table class="tableHeader">
                <thead>
                    <tr>
                        <th>Descarga</th>
                        <th>Operativo</th>
                        {#each Object.keys(form.record[0].record) as key, i}
                            <th>{key}</th>
                        {/each}
                    </tr>
                </thead>
            </table>
            <Divider borderColor="rgba(13, 60, 255, 0.15);"/>
            <div id="scrollArea" class="clusterize-scroll">
                <table>
                    <tbody id="contentArea" class="clusterize-content">
                        {#each form.record as record, i}
                            <tr>
                                <td>
                                    <IconText text='Descargar' icon="file-earmark-arrow-down" title={false} textPadding="0 0 0 1em" size="0.9" fgColor="#6F6F6F" textColor="#6F6F6F" weight=400 href="#"/>
                                </td>
                                <td>
                                    <Avatar image={'https://avatars.dicebear.com/api/initials/' + record.user.name + '.svg?options[background]=%233838FE'} size='1.7em' borderRadius='50%' padding="0 0.3em 0 0"/>
                                </td>
                                {#each Object.keys(form.record[0].record) as key, i}
                                    <th>{form.record[0].record[key]}</th>
                                {/each}
                            </tr>
                        {/each}
                    </tbody>
                </table>
            </div>
    </Card>
</div>