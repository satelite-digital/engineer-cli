<script>
  import {
    Accordion,
    Text,
    Switch,
    DatePicker,
    Divider,
    Checkbox,
  } from "Atoms";
  import { UsersList, InputSelect } from "Molecules";
  export let collection = [
    { id: 1, username: "User", email: "i.dubon@pent.cloud" },
    { id: 2, username: "Isabel Dubón", email: "i.dubon@pent.cloud" },
    { id: 3, username: "Tester", email: "i.dubon@pent.cloud" },
  ];
  export let config = {
    title: "Fromulario 123",
    isEnabled: false,
    startDate: "",
    endDate: "",
    isPublished: false,
    isArchived: false,
    userId: 1,
    versionOfId: null,
    folderId: null,
    users: [{ id: 1, username: "User", email: "i.dubon@pent.cloud" }],
    events: {
      complete: false,
    },
    notify: [{ id: 1, username: "User", email: "i.dubon@pent.cloud" }],
  };
</script>

<style>
  .main {
    grid-area: main;
  }
  .left {
    grid-area: left;
  }
  .right {
    grid-area: right;
  }
  .container {
    display: grid;
    grid-template-columns: auto 65% auto;
    grid-template-rows: auto;
    grid-template-areas: "left main right";
  }
  .center-group {
    display: flex;
    flex-direction: row;
    align-items: center;
  }
</style>

<main class="container">
  <div class="left" />
  <div class="main">
    <Accordion padding="0.3em 0.7em" margin="0.8em 0" let:show borderRadius="0">
      <div slot="control">
        <Text color="#626262">
          <h4>Asignar formulario a usuarios</h4>
        </Text>
      </div>
      <div slot="content">
        <Divider borderColor="rgba(13, 60, 255, 0.2)" />
        <Text
          text="Busca y selecciona usuarios para agregar a este formulario"
          margin="0 0 0.2em 0" />
        <InputSelect bind:collection bind:selected={config.users} />
        <Text color="#626262" text="Usuarios asignados" margin="0 0 0.2em 0">
          Usuarios asignados
        </Text>
        <UsersList bind:collection={config.users} />
      </div>
    </Accordion>

    <Accordion padding="0.3em 0.7em" margin="0.8em 0" let:show borderRadius="0">
      <div slot="control">
        <Text color="#626262">
          <h4>Vigencia del formulario</h4>
        </Text>
      </div>
      <div slot="content">
        <Divider borderColor="rgba(13, 60, 255, 0.2)" />
        <div style="display:flex;">
          <Text
            color="#626262"
            text="Habilitar inmediatmente:"
            margin="0 0 0.2em 0" />
          <Switch bind:checked={config.isEnabled} />
        </div>
        <Text
          color="#626262"
          text="Configura un rango de fechas si necesitas que tu formulario este vigente en un tiempo específico."
          margin="0 0 0.2em 0" />
        <div style="display:flex;">
          <div class="center-group">
            <Text color="#626262" text="Hablitar desde:" margin="0 0 0.2em 0" />
            <DatePicker bind:value={config.startDate} />
          </div>
          <div class="center-group">
            <Text color="#626262" text="Hasta:" margin="0 0 0.2em 0" />
            <DatePicker bind:value={config.endDate} />
          </div>
        </div>
      </div>
    </Accordion>

    <Accordion padding="0.3em 0.7em" margin="0.8em 0" let:show borderRadius="0">
      <div slot="control">
        <Text color="#626262">
          <h4>Notificaciones</h4>
        </Text>
      </div>
      <div slot="content">
        <Divider borderColor="rgba(13, 60, 255, 0.2)" />
        <div>
          <Text color="#626262">
            <h4>Notificar cuando:</h4>
          </Text>
          <Checkbox
            label="Se complete este formulario"
            bind:checked={config.events.complete} />
        </div>
        <Text color="#626262">
          <h4>Notificar a:</h4>
        </Text>
        <InputSelect bind:collection bind:selected={config.notify} />
        <UsersList bind:collection={config.notify} />
      </div>
    </Accordion>
  </div>
  <div class="right" />
</main>
<div>{JSON.stringify(config)}</div>
