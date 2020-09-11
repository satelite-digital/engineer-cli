<script>
  import { createEventDispatcher, onMount } from "svelte";
  // import {LoadingCircle} from "./component.index.js";

  export let image;
  export let loading;
  export let width = "120px";
  export let height = "120px";
  export let borderRadius = "50%";
  export let boxShadow = "0px 0px 15px rgba(100, 100, 100, 0.1)"

  const style = `
      --width:${width};
      --height:${height};
      --boxShadow:${boxShadow};
      --borderRadius:${borderRadius};
  `;
  let dispatch = createEventDispatcher();

  async function eventChange(files) {
    loading = true;
    image = URL.createObjectURL(files[0]);
    dispatch("upload", files);
  }
</script>

<style>
  .avatar {
    display: flex;
    justify-content: center;
    margin-bottom: 16px;
  }
  img {
    width: var(--width);
    height: var(--height);
    border-radius: var(--borderRadius);
    background: #000;
    object-fit: cover;
    box-shadow: var(--boxShadow);
  }
  input[type="file"] {
    outline: 0;
    opacity: 0;
    user-select: none;
    position: absolute;
    transform: translate(85%, 150%);
    padding: 0px;
    width: 50px;
    height: 50px;
    cursor: pointer;
    z-index: 100;
    margin: 0;
  }

  .button {
    width: 35px;
    height: 35px;
    background: #eaeaea;
    border-radius: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    transform: translate(100%, 190%);
    border: 3px solid #f4f4f4;
    z-index: 99;
  }
</style>

<div class="avatar" {style}>
  <img src={image} alt="Imagen de usuario" />
  <input
    type="file"
    accept="image/png, image/jpeg"
    on:change={e => eventChange(e.target.files)} />
  <div class="button">
    {#if !loading}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 512 512">
        <path
          d="M350.54,148.68l-26.62-42.06C318.31,100.08,310.62,96,302,96H210c-8.62,0-16.31,4.08-21.92,10.62l-26.62,42.06C155.85,155.23,148.62,160,140,160H80a32,32,0,0,0-32,32V384a32,32,0,0,0,32,32H432a32,32,0,0,0,32-32V192a32,32,0,0,0-32-32H373C364.35,160,356.15,155.23,350.54,148.68Z"
          style="fill:none;stroke:#707070;stroke-linecap:round;stroke-linejoin:round;stroke-width:32px" />
        <circle
          cx="256"
          cy="272"
          r="80"
          style="fill:none;stroke:#707070;stroke-miterlimit:10;stroke-width:32px" />
        <polyline
          points="124 158 124 136 100 136 100 158"
          style="fill:none;stroke:#707070;stroke-linecap:round;stroke-linejoin:round;stroke-width:32px" />
      </svg>
    {:else}
      <!-- <LoadingCircle stroke="#707070" width="20px" height="20px" /> -->
    {/if}
  </div>
</div>
