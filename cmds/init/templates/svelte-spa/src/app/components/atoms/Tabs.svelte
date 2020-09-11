<script>
    export let tab
    export let tabs = []
    export let style = ''
    export let tabElements = []
    $:{
        tabElements[tab] ? tabElements[tab].click() : ''
    }
</script>


<div class="tabs" style={style}>
    <sl-tab-group>
        {#each tabs as t, i}
            <sl-tab bind:this={tabElements[i]} active={tab == i ? true : false} on:click={(e) => (tab = i)} slot="nav">{t}</sl-tab>
        {/each}
    </sl-tab-group>
</div>