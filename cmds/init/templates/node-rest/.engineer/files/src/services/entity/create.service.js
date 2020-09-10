{{#if options.log}}
{{#each options.log.actions}}
{{#if create}}
{{@root.id}}CreateLog = async (ctx, record)=>{
    const create = {
        data : {
            {{@root.options.log.data}} : {
                connect : {
                    {{#if @root.options.log.foreign}}
                    id : record.{{@root.options.log.foreign}}Id
                    {{else}}
                    id : record.id
                    {{/if}}
                }
            },
            record,
            action : "{{use}}"
        }
    }
    if('session' in ctx){
        Object.assign(create.data, { user : { connect : { id : ctx.session.user.id } } })
    }
    return await ctx.db.{{@root.options.log.logger}}.create(create)
}

{{/if}}
{{/each}}
{{/if}}
const createService = async (ctx)=>{


    if(!Array.isArray(ctx.data)){
        ctx.data = [ ctx.data ];
    }

    let created = []

    for(let item in ctx.data){
        try{
                        
            let query = {
                ...ctx.query,
                data : {
                ...ctx.data[item]
                }
            }

            {{#if parents}}
                {{#each parents}}
                    {{#if options.isCreator}}
            if('session' in ctx){
                Object.assign(query.data, { {{id}} : { connect : { id : ctx.session.user.id } } })
            }
                    {{/if}}
                {{/each}}
            {{/if}}

            const result = await ctx.db.{{{id}}}.create(query)

            created.push(result)
        }catch(err){

            return {
                statusCode : 400,
                message : "One or more of your requests failed",
                created,
                error : err
            }
        }
    }

    {{#if options.log}}
    {{#each options.log.actions}}
    {{#if create}}
        const logged = await {{@root.id}}CreateLog(ctx, created[0])
    {{/if}}
    {{/each}}
    {{/if}}

    return created
}

module.exports = {
    createService
}