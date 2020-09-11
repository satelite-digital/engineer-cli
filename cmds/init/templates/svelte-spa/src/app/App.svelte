<script>
  // Get context from app initialization or set default context values
  export let env = {
    apiURL: "http://localhost:3000"
  };

  // get application index
  import app from "./index"

  // Set context to use in all application
  import { setContext } from "svelte"

  // set env
  setContext("env", env)

  // set services
  setContext("services", app.services)

  // set helpers
  setContext("helpers", app.helpers)

  // config requests
  const { client } = app.services
  client.instance.defaults.baseURL = env.apiURL
  client.instance.interceptors.response.use(app.interceptors.parseResponse)
  client.instance.interceptors.request.use(app.interceptors.authorizeRequest)
  
  // Load router and routes
  import Router from "svelte-spa-router";
  import { location, push } from "svelte-spa-router";
  import routes from "./routes/index";

  function conditionsFailed(event) {
    if(event.detail.location != '/login'){
      push('/login')
    }else{
      push('/home')
    }
  }

  // test only
  document.documentElement.style.setProperty('--sl-color-primary-hue', '174.2');
  document.documentElement.style.setProperty('--sl-color-primary-saturation', '81.5%');
  // end test only
</script>

<style>
  /*  */
</style>

<svelte:head>
  <link
    href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,300;0,400;0,600;0,700;1,300;1,400;1,600;1,700&family=Nunito+Sans:ital,wght@0,300;0,400;0,600;0,700;1,300;1,400;1,600;1,700&display=swap"
    rel="stylesheet" />
</svelte:head>


<Router {routes} on:conditionsFailed={conditionsFailed} />
