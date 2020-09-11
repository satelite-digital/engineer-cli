<script>
    export let checked = false;
    export let color = "#15CEBC";
    export let width = "2.5em";
    export let height = "1.25em";

    const style  = `
        width:${width};
        height:${height};
        justify-self: center;
        position: relative;
        display: flex;
        --color:${color};
      `
  </script>
  
  <style>
  
    .switch input {
      opacity: 0;
      width: 0;
      height: 0;
    }
      
     
    .slider {
      grid-area: slide;
      position: absolute;
      cursor: pointer;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-color: #E8E8E8;
      -webkit-transition: 0.4s;
      transition: 0.4s;
      border-radius: 20px;
    }
  
    .slider:before {
      position: absolute;
      content: "";
      height: 16.5px;
      width: 16.5px;
      left: 1.8px;
      bottom: 1.8px;
      background-color: white;
      -webkit-transition: 0.4s;
      transition: 0.4s;
      border-radius: 50%;
      box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.25);
    }
  
    input:checked + .slider {
      background-color: var(--color);
      box-shadow: 0 0 1px var(--color);
    }
  
    input:checked + .slider:before {
      -webkit-transform: translateX(20px);
      -ms-transform: translateX(20px);
      transform: translateX(20px);
    }
  </style>
  
  <label class="switch" {style}>
      <input type="checkbox" bind:checked />
      <span class="slider"></span>
  </label>