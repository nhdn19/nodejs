const express = require('express')
const app = express()
const mongoose = require('mongoose')

app.use(express.json())

const pagesRoute = require('./routes/pages')
const booksRoute = require('./routes/books')

app.use('/', pagesRoute)
app.use('/books', booksRoute)

app.get('/', (req, res) => {
    res.send('Stupid Express')
})

mongoose.connect('mongodb://localhost:27017/database', 
    { 
        useNewUrlParser: true,
        useUnifiedTopology: true  
    }, 
    () => console.log('MongoDB Connected')
)

app.listen(8000, () => {
    console.log('Server Connected')
})