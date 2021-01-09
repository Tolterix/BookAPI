const express = require('express')
const cors = require('cors')

const app = express()
const port = 3000
const knex = require('knex')(require('./knexfile.js')['development'])

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cors())

//app.use('/api/books', require("./route/api/books"))

app.get('/api/books', (req, res) => {
    console.log(req.body)
    knex
        .from('books')
        .select('id', 'book_title', 'author', 'isbn_number', 'checked_out')
        .orderBy('id')
    .then(allBooks => {
        res.status(200).send(allBooks)
    })
})

app.get('/api/books/:bookId', (req, res) => {
    knex
      .from('books')
      .where({id: req.params.bookId})
      .select('id','book_title','author','isbn_number','checked_out','checkout_id', 'due_date')
    .then(book => {
        res.status(200).send(book)
    })
})

app.get('/api/books/:bookId/checkout/:userId', (req, res) => {
    if (Object.keys(req.query).includes('checkout')) {
        knex 
            .from('books')
            .where({id: req.params.bookId})
            .update({checked_out: true, checkout_id: req.params.userId})
        .then(() => {
            res.status(200).send({successful: true})
        })
    } else {
        knex
            .from('books')
            .where({id: req.params.bookId})
            .select('checked_out', 'checkout_id')
        .then(data => {
            if (data[0].checked_out == true) {
                if (data[0].checkout_id == req.params.userId) {
                    res.status(200).send({message: 'You have the book', isCheckedOut: true, dueDate: 0})
                } else {
                    res.status(200).send({isCheckedOut: true, dueDate: 0})
                }
            } else {
                res.status(200).send({isCheckedOut: false, dueDate: 0})
            }
        })
    }
})

app.get('/api/books/:bookId/return', (req, res) => {
    knex
        .from('books')
        .where({id: req.params.bookId})
        .update({checked_out: false, checkout_id: null})
    .then(() => {
        res.status(200).send({successful: true})
    })
})

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`));

module.exports = app