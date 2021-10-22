const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    name: {type: String, required: true},
    age: {type: Number, required: true},
    email: {type: String, required: true},
    books: [{type: Array, required: true}]
})

const User = mongoose.model('User', userSchema)
module.exports = User;