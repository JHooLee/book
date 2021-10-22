const express = require('express')
const BookRouter = require('./book')
const router = express.Router()
const book = require('./book')
const Book = require("../../model/Book")
const UserRouter = require('./user')
const user = require('./user')
const User = require("../../model/User")

router.use('/books', book)
router.use('/user', user)

//도서 목록 전체 검색
BookRouter.route('/').get(async (req, res) => {
    const books = await Book.find()
    res.json({status: 200, books})
})
//특정 도서 검색(id로)
BookRouter.route('/:id').get((req, res) => {
    Book.findById(req.params.id, (err, book) => {
        if(err) throw err;
        res.json({status: 200, book})
    })
})
//데이터베이스에 도서 입력
BookRouter.route('/').post((req, res) => {
    console.log(`title: ${req.body.title}`)
    Book.findOne({ISBN: req.body.ISBN}, async(err, book) => {
        //isbn 중복 검사
        if(err) throw err;
        if(!book){
            const newBook = new Book(req.body)
            await newBook.save().then(() => {
                res.json({status: 201, msg: `new ${req.body.title} created in db!`, newBook})
            })
        }else{
            const msg = 'this book already exists in db!'
            console.log(msg)
            res.json({status: 204, msg})
        }
    })
})
//수정(id로 검색해서)
BookRouter.route('/:id').put((req, res) => {
    Book.findByIdAndUpdate(req.params.id, req.body, {new: true}, (err, book) => {
        if(err) throw err;
        res.json({status: 204, msg: `book ${req.params.title} updated in db !`, book})
    })
})
//삭제(id로)
BookRouter.route('/:id').delete((req, res) => {
    Book.findByIdAndRemove(req.params.id, (err, book) => {
        if(err) throw err;
        res.json({status: 204, msg: `book ${req.params.title} removed in db !`})
    })
})

module.exports = router