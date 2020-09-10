const user = require('./user.json')
const form = require('./blog.json')
const record = require('./post.json')
const hook = require('./editor.json')

module.exports = [
    { id : "user", data : user },
    { id : "blog", data : form },
    { id : "post", data : record },
    { id : "editor", data : hook }
]