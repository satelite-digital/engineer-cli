import API from './api.js'
import qs from "qs"

const createService = async (data, query = {}, config) => {
    return await API.post(`api/{{id}}?${qs.stringify(query)}`, data, config)
}

const deleteService = async (resource = "undefined", query, config) => {
    return await API.delete(`api/{{id}}/${resource}?${qs.stringify(query)}`, config)
}

const updateService = async (resource = "undefined", data, query = {}, config) => {
    return await API.put(`api/{{id}}/${resource}?${qs.stringify(query)}`, data, config)
}

const findManyService = async (query = {}, config) => {
    return await API.get(`api/{{id}}?${qs.stringify(query)}`, config)
}

const findOneService = async (resource = "undefined", query, config) => {
    return await API.get(`api/{{id}}/${resource}?${qs.stringify(query)}`, config)
}

const countService = async (query, config) => {
    return await API.get(`api/{{id}}Count?${qs.stringify(query)}`, config)
}

{{#each parents}}
const findBy{{#if named}}{{named}}{{else}}{{name}}{{/if}}IdService = async (id, query = {}, config) => {
    return await API.get(`api/{{id}}/${id}/{{../name}}?${qs.stringify(query)}`, config)
}
{{/each}}

export default {
    create: createService,
    delete: deleteService,
    update: updateService,
    findMany: findManyService,
    findOne: findOneService,
    count: countService,
    {{#each parents}}
    findBy{{#if named}}{{named}}{{else}}{{name}}{{/if}}Id : findBy{{#if named}}{{named}}{{else}}{{name}}{{/if}}IdService{{#if @last}}{{else}},{{/if}}
    {{/each}}
}
