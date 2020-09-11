import authGuard from "./auth.guard";
import { modules } from "./../index";
import { wrap } from "svelte-spa-router";

const routes = {
  
  '/' : wrap(modules.AuthModule.Login, authGuard), // dev 
  "/login": wrap(modules.AuthModule.Login, authGuard),
  // Guarded routes
  "/home": wrap(modules.HomeModule.Home, authGuard),
  "/report": wrap(modules.ReportModule.Pivot, authGuard),
  {{#each model}}
  "/{{id}}": wrap(modules.{{name}}Module.List, authGuard),
  {{/each}}
  
};

export default routes;
