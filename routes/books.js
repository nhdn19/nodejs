const express = require('express')
const router = express.Router()
const Book = require('../model/Book')

router.get('/', async (req, res) => {
    try {
        const allBook = await Book.find()
        res.json(allBook)
    }
    catch (err) {
        res.json({message: err})
    }
})

router.post('/', async (req, res) => {
    try {
        const savedBook = await Book.create(req.body)
        const allBook = await Book.find()
        res.json(allBook)
    }
    catch (err) {
        res.json({message: err})
    }
})

router.get('/:id', async (req, res) => {
    try {
        const book = await Book.findById(req.params.id)
        res.json(book)
    }
    catch (err) {
        res.json({message: err})
    }
})

router.delete('/', async (req, res) => {
    try {
        const deletedBook = await Book.deleteMany({
            _id: {$in: req.body}
        })
        const allBook = await Book.find()
        res.json(allBook)
    }
    catch (err) {
        res.json({message: err})
    }
})

router.patch('/:id', async (req, res) => {
    try {
        const updatedField = {
            title: req.body.title,
            description: req.body.description
        }
        const updatedBook = await Book.updateOne(
            {_id: req.params.id},
            {$set: updatedField}
        )
        res.json(updatedBook)
    }
    catch (err) {
        res.json({message: err})
    }
})

module.exports = router