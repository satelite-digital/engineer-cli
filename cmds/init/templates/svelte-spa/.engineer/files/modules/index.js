import AuthModule from './auth/auth.module.js'
import HomeModule from './home/home.module.js'
import ReportModule from './report/report.module.js'
{{#each model}}
import {{name}}Module from './{{id}}/{{id}}.module.js'
{{/each}}

export default {
    AuthModule,
    HomeModule,
    ReportModule,
    {{#each model}}
    {{name}}Module{{#if @last}}{{else}},{{/if}}
    {{/each}}
}