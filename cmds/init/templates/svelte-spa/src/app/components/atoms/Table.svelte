<script>
	export let style
    export let data
    export let headers
    export let search = ''
    export let noFilter
    export let filter
    export let filterSelection
	export let sortKey
	export let alternate = ''
	export let th = ''
	export let td = ''
	export let tr = ''
	export let thead = ''
    export let sort = false
    $:  headerKeys = Object.keys(headers)
	
    function matchSearch(row){
		let values = Object.values(row)
		for(let value of values){
			if(value && value.toString().toLowerCase().includes(search.toLowerCase())){
				return true
			}
		}
    }
    $:{
		if(sortKey){
			data.sort((a,b)=>{
				if(a[sortKey] > b[sortKey]){
					 return sort ? -1 : 1
				}
				if(a[sortKey] < b[sortKey]) return sort ? 1 : -1
				return 0
			})
            data = data
		}
	}
	function get(object, path, def) {
		let s = path.split('.')
		return test(object, s)
		function test(obj, keys) {
			if (Array.isArray(keys) && keys.length > 0) {
				let key = keys.shift()
				let a = obj[key]
				if (a instanceof Object && keys.length > 0) {
					return test(a, keys)
				} else {
					if (a !== undefined) {
						return a
					} else {
						return def
					}
				}
			}
		}
	}
</script>

<style>
	table{
        width: 100%;
		border-spacing: 0;
		font-size: 14px;
	}
	th{
		transition: all 0.2s;
		user-select: none;
		cursor: pointer;
		color: #333;
        padding: 8px;
        position: sticky;
        top: 0;
	}
	tr{
		text-align: center;
		padding: 5px;
	}
	svg{
		transition: all 0.2s;
	}
	.flip {
		transform: rotate(180deg);
	}
	.header{
		display: inline-flex;
		align-content: center;
	}
	
</style>

<table {style}>
    <thead style={thead}>
		{#each headerKeys as key}
		<th style={th} on:click={() => {
			sortKey = key
			sort = !sort
		}}>
		<span class="header">
			{headers[key]}
			{#if sortKey == key}
				<svg
					height="20"
					class={sort == true ? 'flip' : ''}
					viewBox="0 0 24 24"
					width="20">
					<path d="M0 0h24v24H0V0z" fill="none" />
					<path
						fill="var(--primary, #333)"
						class="arrow"
						d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z" />
				</svg>
			{/if}
		</span>
		</th>
		{/each}
	</thead>
    
    {#each data as row, index}
        {#if filterSelection == noFilter || get(data[index], filter) == filterSelection }
			{#if search == '' || matchSearch(row)}
                <tr style="{alternate != '' && index % 2 != 0 ? `background:${alternate};` : ''}{tr}">
                    {#each headerKeys as key}
                        <td style={td}>
                            <slot {row} {key} {index}></slot>
                        </td>
                    {/each}
                </tr>
			{/if}
		{/if}
    {/each}
</table>