<script>

import { getContext } from 'svelte'
import { Group, Card, CardItem, Text, IconButton, Divider, Dropdown, Icon, Dialog, Input, Button, Toast, Skeleton } from 'Atoms'
import { AvatarList, IconText } from 'Molecules'

const { formatDate } = getContext('helpers')
export let width="100%"


export let form = false
export let flex = 'unset'
export let margin = '1em 0 0 0'
export let size=''
export let maxWidth="unset"

 let items = [
    "https://randomuser.me/api/portraits/men/40.jpg",
    "https://randomuser.me/api/portraits/men/1.jpg",
    "https://randomuser.me/api/portraits/men/9.jpg",
    "https://randomuser.me/api/portraits/men/41.jpg",
    "https://api.adorable.io/avatars/282/5",
    "https://api.adorable.io/avatars/282/6",
    "https://api.adorable.io/avatars/282/7"
  ]

  let options={
      dateStyle : 'short'
  }

  import {push, pop, replace} from 'svelte-spa-router'
  const client = getContext("services").client
  const toggleStatus = (id, value) =>{
      client.form.update(id, {isEnabled : value})
  }

  //delete
let sending = false
let notifier
let tmpForm = {}
const showDelete = (form) => {
    tmpForm = form
    deleteFormModal.show()
}
let deleteFormModal
import { createEventDispatcher } from 'svelte';
const dispatch = createEventDispatcher();
const deleteForm = (e) => {
    sending = true
    client.form.delete(tmpForm.id).then((data) => {
        dispatch('deleted', data); //pa que lo quite del componente padre
        deleteFormModal.hide()
        notifier.success('El formulario ha sido eliminado', 5000)
        sending = false
    })
}
</script>


<Card {width} {maxWidth} height="fit-content" borderRadius="1em 1em" {margin} {flex} padding="2em" boxShadow="0px 0px 15px rgba(100, 100, 100, 0.1);">
    <CardItem>
        <div slot="content">
            <Text size="1" weight=600 margin="0 0 1em 0" text={form.title} route={true} href="/forms/detail/{form.id}" />
            <IconText size="0.86" fgColor="#8D8D8D" textColor="#8D8D8D" text="{formatDate(form.createdAt, "es-GT", {dateStyle:'short'})}" icon="clock" margin="1em 0 1em 0" />
            <IconText size="0.86" fgColor="#8D8D8D" textColor="#8D8D8D" text="Del {formatDate(form.startDate, "es-GT", {dateStyle:'short'})} al {formatDate(form.endDate, "es-GT", {dateStyle:'short'})}" icon="calendar-event" margin="0 0 1em 0" />
            <Group direction="column" height="auto" alignItems="flex-start">
                <AvatarList {items} maxItems="4" borderRadius="50%" avatarSize="2.1" margin="0  0 2em 0" />
            {#if size == 'small'}
                <Group direction="row" height="auto" alignItems="flex-start" margin="0 0 2em 0">
                    <svg width="20" height="16" viewBox="0 0 20 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9.49003 12C10.37 12 11.19 11.74 11.88 11.3L14.32 13.74L15.74 12.32L13.3 9.89C13.74 9.19 14 8.38 14 7.5C14 5.01 11.99 3 9.50003 3C7.01003 3 5.00003 5.01 5.00003 7.5C5.00003 9.99 7.01003 12 9.49003 12ZM9.50003 5C10.88 5 12 6.12 12 7.5C12 8.88 10.88 10 9.50003 10C8.12003 10 7.00003 8.88 7.00003 7.5C7.00003 6.12 8.12003 5 9.50003 5ZM18 0H2.00003C0.90003 0 3.05176e-05 0.9 3.05176e-05 2V14C3.05176e-05 15.1 0.90003 16 2.00003 16H18C19.1 16 20 15.1 20 14V2C20 0.9 19.1 0 18 0ZM18 14H2.00003V2H18V14Z" fill="#4E4EFF"/>
                    </svg>
                    <Text text="Ver resultados" href={'/forms/detail/' + form.id} route={true} color="#0000FF" size="1" weight="600" padding="0 0 0 0.3em" textDecoration="underline"/>
                </Group>
            {/if}
            </Group>
        </div>
        <div slot="helper">
        <Dropdown placement="left-start">
            <div slot="button">
                <IconButton icon="three-dots-vertical" size="1.5"  fgColor="#262626"/>
            </div>
            <div slot="menu">
                <sl-menu>
                    <sl-menu-item on:click={push('/forms/fill/' + form.id)}>
                        Llenar desde la web
                        <sl-icon slot="prefix" name="globe2"></sl-icon>
                    </sl-menu-item>
                    <sl-menu-item>
                        Compartir formulario
                        <sl-icon slot="prefix" name="link"></sl-icon>
                    </sl-menu-item>
                    <sl-menu-item>
                        Mover a
                        <sl-icon slot="prefix" name="box-arrow-left"></sl-icon>
                    </sl-menu-item>
                    <sl-menu-item>
                        Duplicar formulario
                        <sl-icon slot="prefix" name="files"></sl-icon>
                    </sl-menu-item>
                    <sl-menu-item>
                        Versionamiento
                        <sl-icon slot="prefix" name="arrow-counterclockwise"></sl-icon>
                    </sl-menu-item>
                    <sl-menu-item on:click={push('/forms/form/' + form.id)}>
                        Editar formulario
                        <sl-icon slot="prefix" name="pencil"></sl-icon>
                    </sl-menu-item>
                    <sl-menu-item on:click={showDelete(form)}>
                        Eliminar formulario
                        <sl-icon slot="prefix" name="trash"></sl-icon>
                    </sl-menu-item>
                </sl-menu>
            </div>
        </Dropdown>
        </div>
    </CardItem>
    <Divider borderColor="#E6EBFF" />
    <CardItem widthContent="60%" widthHelper="40%" alignItemContent="flex-start" alignItemHelper="flex-end" placeContentGrid="center" padding="2em 0em 0em 0em">
        <div slot="content">
            <Group direction="row" justify="flex-start" alignItems="center" width="auto" placeContent="center">
            {#if size == 'small'}
                <Text weight="400" size="1">Habilitado</Text>
            {:else}
                    <svg width="20" height="16" viewBox="0 0 20 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9.49003 12C10.37 12 11.19 11.74 11.88 11.3L14.32 13.74L15.74 12.32L13.3 9.89C13.74 9.19 14 8.38 14 7.5C14 5.01 11.99 3 9.50003 3C7.01003 3 5.00003 5.01 5.00003 7.5C5.00003 9.99 7.01003 12 9.49003 12ZM9.50003 5C10.88 5 12 6.12 12 7.5C12 8.88 10.88 10 9.50003 10C8.12003 10 7.00003 8.88 7.00003 7.5C7.00003 6.12 8.12003 5 9.50003 5ZM18 0H2.00003C0.90003 0 3.05176e-05 0.9 3.05176e-05 2V14C3.05176e-05 15.1 0.90003 16 2.00003 16H18C19.1 16 20 15.1 20 14V2C20 0.9 19.1 0 18 0ZM18 14H2.00003V2H18V14Z" fill="#4E4EFF"/>
                    </svg>
                    <Text text="Ver resultados" href={'/forms/detail/' + form.id} route={true} color="#0000FF" size="1" weight="600" padding="0 0 0 0.3em" textDecoration="underline"/>
            {/if}
            </Group>
        </div>
        <div slot="helper">
            <Group direction="row" justify="flex-end" alignItems="center" width="auto">
                {#if size != "small"}<Text weight="400" size="1">Habilitado</Text>{/if}
                <sl-switch checked={form.isEnabled} on:slChange={(e) => toggleStatus(form.id, e.target.checked)} style="margin:0 0 0 1em;--width: 38px; --height: 16px; --thumb-size: 18px;" />
            </Group>
        </div>
    </CardItem>
</Card>

<Dialog name="deleteFormModal" title="Eliminar formulario" bind:dialog={deleteFormModal} width="400px">
    <div slot="content">
        {#if sending}
            <Skeleton width="calc(100%)" height="40px" margin="0"/>
        {:else}
            <Text weight="600" size="1" color="gray" text="¿Estás seguro que quieres eliminar el formulario {tmpForm.title}?"/>
        {/if}
    </div>
    <div slot="footer">
        <Group direction='row' justifyContent="flex-end" alignItems="center" placeContent="flex-end">
            <Text weight="600" size="1" color="gray" title={true} text="Cancelar" cursor="pointer" on:click={deleteFormModal.hide()}/>
            <Button size="medium" colorText="#fff" bgColor="#0000FF" border="2px solid #0000FF" borderRadius="5px" width="125px" height="auto" on:click={(e) => deleteForm(e)} margin="0 0 0 1em">Eliminar</Button>
        </Group>
    </div>
</Dialog>

<Toast bind:notify={notifier}></Toast>