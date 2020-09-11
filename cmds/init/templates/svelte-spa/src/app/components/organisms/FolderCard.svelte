<script>

import { getContext } from 'svelte'
import { Group, Card, CardItem, Text, IconButton, Divider, Dropdown, Icon, Dialog, Input, Button, Toast, Skeleton } from 'Atoms'
import { AvatarList, IconText } from 'Molecules'

export let width="100%"


export let folder = false
export let flex = 'unset'
export let margin = '1em 0 0 0'
export let size=''
export let maxWidth="unset"


  import {push, pop, replace} from 'svelte-spa-router'
  const client = getContext("services").client
//   const toggleStatus = (id, value) =>{
//       client.folder.update(id, {isEnabled : value})
//   }
let notifier
let tmpFolder = {}
let sending = false

//update
let updateFolderModal // hay que definir la varible que va almacenar los modals, se puede hacer desde un atributo del componente? linea 88:69
let updateFolderInput // hay que definir la varible que va almacenar el input, se puede hacer desde un atributo del componente?
const showUpdate = (folder) => {
        tmpFolder = folder
        tmpFolder.invalid = false
        updateFolderModal.show()
}
const updateFolder = (e) => {
    tmpFolder.invalid = false
        if (tmpFolder.title != ''){
            sending = true
            client.folder.update(tmpFolder.id, {
                title : tmpFolder.title,
                isArchived: false
            }).then((data) => {
                folder.title = tmpFolder.title
                sending = true
                updateFolderModal.hide()
                notifier.success('El nombre ha sido actualizado', 5000)
            })
        } else {
            updateFolderInput.setFocus()
            invalidFolderName = true
            notifier.warning('El nombre es requerido', 5000)
        }
}

//delete
const showDelete = (folder) => {
    tmpFolder = folder
    deleteFolderModal.show()
}
let deleteFolderModal
import { createEventDispatcher } from 'svelte';
const dispatch = createEventDispatcher();
const deleteFolder = (e) => {
    sending = true
    client.folder.delete(tmpFolder.id).then((data) => {
        dispatch('deleted', data); //pa que lo quite del componente padre
        deleteFolderModal.hide()
        notifier.success('La carpeta ha sido eliminada', 5000)
        sending = false
    })
}
</script>


<Card {width} {maxWidth} height="fit-content" borderRadius="1em 1em" {margin} {flex} padding="2em" boxShadow="0px 0px 15px rgba(100, 100, 100, 0.1);">
    <CardItem>
        <div slot="content">
        <Group justify="center" height="fit-content" alignItems="center" direction="row">
            <img src='img/folder.svg' alt="folder.title" style="width:50px;padding:'0 2em'" />
            <Text size="1" weight=600 margin="0 0 0 1em" text={folder.title} route={true} href="/forms/folder/{folder.id}" />
            <!-- <IconText size="0.86" fgColor="#8D8D8D" textColor="#8D8D8D" text="{formatDate(folder.createdAt, "es-GT", {dateStyle:'short'})}" icon="clock" margin="1em 0 1em 0" /> -->
        </Group>
        </div>
        <div slot="helper">
        <Dropdown placement="left-start">
            <div slot="button">
                <IconButton icon="three-dots-vertical" size="1.5"  fgColor="#262626"/>
            </div>
            <div slot="menu">
                <sl-menu>
                    <sl-menu-item>
                        Compartir formulario
                        <sl-icon slot="prefix" name="link"></sl-icon>
                    </sl-menu-item>
                    <sl-menu-item>
                        Mover a
                        <sl-icon slot="prefix" name="box-arrow-left"></sl-icon>
                    </sl-menu-item>
                    <sl-menu-item on:click={showUpdate(folder)}>
                        Renombrar carpeta
                        <sl-icon slot="prefix" name="files"></sl-icon>
                    </sl-menu-item>
                    <sl-menu-item on:click={showDelete(folder)}>
                        Eliminar carperta
                        <sl-icon slot="prefix" name="trash"></sl-icon>
                    </sl-menu-item>
                </sl-menu>
            </div>
        </Dropdown>
        </div>
    </CardItem>
</Card>

<Dialog name="updateFolderModal" title="Nueva carpeta" bind:dialog={updateFolderModal} width="400px">
    <div slot='content'>
        {#if sending}
            <Skeleton width="calc(100%)" height="40px" margin="0"/>
        {:else}
            <Input placeholder="Nombre de carpeta" bind:value={tmpFolder.title} bind:element={updateFolderInput} invalid={tmpFolder.invalid}></Input>
        {/if}
        
    </div>
    <div slot="footer">
        <Group direction='row' justifyContent="flex-end" alignItems="center" placeContent="flex-end">
            <Text weight="600" size="1" color="gray" title={true} text="Cancelar" cursor="pointer" on:click={updateFolderModal.hide()}/>
            <Button size="medium" colorText="#fff" bgColor="#0000FF" border="2px solid #0000FF" borderRadius="5px" width="125px" height="auto" on:click={(e) => updateFolder(e)} margin="0 0 0 1em">Actualizar</Button>
        </Group>
    </div>
</Dialog>

<Dialog name="deleteFolderModal" title="Eliminar carpeta" bind:dialog={deleteFolderModal} width="400px">
    <div slot="content">
        {#if sending}
            <Skeleton width="calc(100%)" height="40px" margin="0"/>
        {:else}
            <Text weight="600" size="1" color="gray" text="¿Estás seguro que quieres eliminar la carpeta {tmpFolder.title}?"/>
        {/if}
    </div>
    <div slot="footer">
        <Group direction='row' justifyContent="flex-end" alignItems="center" placeContent="flex-end">
            <Text weight="600" size="1" color="gray" title={true} text="Cancelar" cursor="pointer" on:click={deleteFolderModal.hide()}/>
            <Button size="medium" colorText="#fff" bgColor="#0000FF" border="2px solid #0000FF" borderRadius="5px" width="125px" height="auto" on:click={(e) => deleteFolder(e)} margin="0 0 0 1em">Eliminar</Button>
        </Group>
    </div>
</Dialog>

<Toast bind:notify={notifier}></Toast>