const mongoose = require('mongoose')

const bookSchema = mongoose.Schema({
    title: {type: String, required: true},
    author: {type: String, required: true},
    summary: {type: String},
    genre: {type: String},
    release: {type: String, required: true},
    ISBN: {type: Number, required: true}
})

const Book = mongoose.model('Book', bookSchema)
module.exports = Book;