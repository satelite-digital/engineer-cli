class FormHook {
	constructor({
		title = '',
		endpoint = '',
		method = '',
		type = '',
		headers = [],
		body = [],
		params = [],
		form = '',
		template = {},
	} = {}) {
		this.title = title
		this.endpoint = endpoint
		this.method = method
		this.type = type
		this.headers = headers
		this.body = body
		this.params = params
		this.form = form
		this.template = template
	}
	cloneHook(val) {
		let { title, endpoint, method, type, headers, body, params, form } = val
		this.title = title
		this.endpoint = endpoint
		this.method = method
		this.type = type
		this.headers = headers
		this.body = body
		this.params = params
		this.form = form
	}
	addBody() {
		this.body.push({ key: '', value: '' })
		return this
	}
	addParam() {
		this.params.push({ key: '', value: '' })
		return this
	}
	addHeader() {
		this.headers.push({ key: '', value: '' })
		return this
	}
	removeBody(i) {
		this.body.splice(i, 1)
		return this
	}
	removeParam(i) {
		this.params.splice(i, 1)
		return this
	}
	removeHeader(i) {
		this.headers.splice(i, 1)
		return this
	}
	parseHeaders(){
		return this.headers.reduce((obj, header)=>{
			obj[header.key] = header.value
			return obj
		}, {})
	}
	parseBody(){
		return this.body.reduce((obj, header)=>{
			obj[header.key] = header.value
			return obj
		}, {})
	}
	parseParams() {
		// temporal, esto lo hace el server al procesar un test?
		return this.params.reduce((acc, param, i, array) => {
			return `${array.length > 0 && i == 0 ? '?' : ''}${acc}${param.key}=${
				param.value
			}${i < array.length ? '&' : ''}`
		}, '')
    }
    
    //testHook makes a network request using the params, url, body and headers of 'this'.
    //it evaluates the response and returns a template and the response itself.
    //the template contains an array of objects containing keys and types. 
    //the keys can be paths of nested objects like: "object.nested.property"
    //those paths point to single values in the response
    //the 'type' value indicates the type of the value that the path points to. 
    // for example: [{key: "person.name", type: "string"},{key: "person.age", type: "number"}, {key: "id", type: "string"}]
	async testHook() {
		let options = {
			method: this.method,
			headers: this.parseHeaders()
		}
		if(this.method != "GET"){
			options.body = JSON.stringify(this.parseBody())
		}
		let result, template // result is the response from the endpoint. template is the test of the data that comes in the response.
		let url = `${this.endpoint}${this.parseParams()}`
		let res = await fetch(url, options)
		//res is serverResponse
		if (res.ok) {
			try {
				result = await res.clone().json()
				template = this.evaluate(result)
				return { result, template }
			} catch (err) {
				console.log(res, err)
				try {
					result = await res.text()
					template = this.evaluate(result)
					return { result, template }
				} catch (e) {
					console.log(e)
					template = { error: e }
					return { result, template }
				}
			}
		} else {
			template = { error: res.statusText }
			return { result, template }
		}
    }
    //evaluate takes any kind of value and returns a general type
    //types can be  'error', 'object', 'arrayOfObjects', 'array' or 'value'
	evaluate(value) {
		let type = assert(value)
		const validTypes = ['object', 'arrayOfObjects', 'array', 'value']
		if (!validTypes.includes(type)) return { error: 'Invalid type', type }
		switch (type) {
			case 'object': {
				return { type, keys: getKeys(value) }
			}
			case 'arrayOfObjects': {
				return { type, keys: getKeys(value[0]) }
			}
			case 'array': {
				return { type, keys:[{path: "Array", type: "array"}] }
			}
			case 'value': {
				return { type: assertSingleValue(value), keys:[{path: "Valor simple", type: assertSingleValue(value)}] }
			}
        }
        //assert takes any value and asserts what type or format it has.
        //It returns either: 'emptyArray', 'emptyString', 'object', 'arrayOfObjects', 'arrayOfArrays', 'array' or 'value'
		function assert(value) {
			let error = value instanceof Error
			if (error) {
				return 'error'
			}
			let array = Array.isArray(value)
			let object = value instanceof Object
			let length = value.length
			let arrayOfArrays = Array.isArray(value[0])
			let arrayOfObjects = value[0] instanceof Object
			if (array && length == 0) {
				return 'emptyArray'
			}
			if (length == 0) {
				return 'emptyString'
			}
			if (object && !array && !arrayOfArrays && !arrayOfObjects) {
				return 'object'
			}
			if (array && arrayOfObjects && !arrayOfArrays && length > 0) {
				return 'arrayOfObjects'
			}
			if (arrayOfArrays && arrayOfObjects) {
				return 'arrayOfArrays'
			}
			if (array && !arrayOfArrays && !arrayOfObjects) {
				return 'array'
			}
			if (!array && !object) {
				return 'value'
			}
		}
        //assertSingle value takes any 'value' type from the function 'assert'.
        //it returns the primitive value of the object. Arrays are returned as 'array'.
        // If it's a string, it also checks if it can be coerced into a date. If it can, it returns 'date'. 
        // Some values may be coerced into a date but may not be a date, like a hex color #333000.
        // 'date' should be taken as a string unless it's needed as a date
		function assertSingleValue(value) {
            if(typeof value == "object" && Array.isArray(value) == true)return 'array'
			if (typeof value != 'string') return typeof value
			let d = new Date(value).getTime()
			if (Number.isNaN(d) == false) {
				return 'date/string'
			} else {
				return 'string'
			}
		}
        //getKeys takes an object and recursively finds the keys in the object. 
        //nested objects are returned as a path like this: "object.nested.property.id"
        //it returns an array of all the posible paths in the object
		function getKeys(obj) {
			let result = []
			recursive(obj)
			return result
			function recursive(value, parent = '') {
				let entries = Object.entries(value)
				entries.forEach((entry) => {
					if (entry[1] instanceof Object && !Array.isArray(entry[1])) {
						recursive(entry[1], `${parent}${entry[0]}.`)
					} else {
						let type = assertSingleValue(entry[1])
						let path = `${parent}${entry[0]}`
						result.push({ path, type })
					}
				})
			}
		}
	}
}
export {FormHook}

// //example
// let form = {
// 	'name': 'Formulario 1',
// 	'id': 'asmdfansdf9aiduf9aio3eopwdia',
// 	'fields': [
// 		{
// 			'id': 'ftkciwex4cc',
// 			'name': 'Numeros',
// 			'type': 'select',
// 			'required': true,
// 			'options': [1,2,3],
// 			'config': {},
// 			'hook': {
// 				'compatible': ['array', 'arrayOfObjects'],
// 				'id': 'aisdfuasdf',
// 				'path': 'numeros',
// 				'key': '',
// 				'type': 'array',
// 			},
// 		},
// 		{
// 			'id': '4fs9x8cpsfc',
// 			'name': '',
// 			'type': 'date',
// 			'required': false,
// 			'options': [''],
// 			'config': {},
// 			'value': '',
// 			'hook': {
// 				'compatible': ['date'],
// 			},
// 		},
// 	],
// 	'config': {},
// };

// let hook = {
// 	'id': 'aisdfuasdf',
// 	'title': 'Excel',
// 	'endpoint':
// 		'https://script.google.com/macros/s/AKfycbymwyVBIZ2AedT0mpy1d7XOCFTelnrdU3V8xT5rU15CdGq8-giE/exec',
// 	'method': 'GET',
// 	'type': 'READ', //WRITE
// 	'headers': [],
// 	'body': [],
// 	'params': [
// 		{
// 			'key': 'type',
// 			'value': 'object',
// 		},
// 	],
// 	'template': {
// 		'type': 'object',
// 		'keys': [
// 			{
// 				'path': 'numeros',
// 				'type': 'array',
// 			},
// 			{
// 				'path': 'name',
// 				'type': 'string',
// 			},
// 			{
// 				'path': 'age',
// 				'type': 'number',
// 			},
// 			{
// 				'path': 'location.x',
// 				'type': 'number',
// 			},
// 			{
// 				'path': 'location.y',
// 				'type': 'number',
// 			},
// 			{
// 				'path': 'time',
// 				'type': 'date',
// 			},
// 			{
// 				'path': 'bool',
// 				'type': 'boolean',
// 			},
// 			{
// 				'path': 'nest.colores.rojo',
// 				'type': 'string',
// 			},
// 			{
// 				'path': 'nest.colores.azul',
// 				'type': 'string',
// 			},
// 		],
// 		'example': {
// 			'numeros': [1, 2, 3],
// 			'name': 'Juan',
// 			'age': 31,
// 			'location': { 'x': 10, 'y': 20 },
// 			'time': '',
// 			'bool': true,
// 			'nest': {
// 				'colores': {
// 					'rojo': '#0ff',
// 					'azul': '#f0f',
// 				},
// 			},
// 		},
// 	},
// };

