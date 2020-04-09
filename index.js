const express = require('express')
const app = express()
const mongoose = require('mongoose')
require('dotenv/config')

app.use(express.json())

const pagesRoute = require('./routes/pages')
const booksRoute = require('./routes/books')

app.use('/', pagesRoute)
app.use('/books', booksRoute)

app.get('/', (req, res) => {
    res.send('Stupid Express')
})

mongoose.connect(process.env.DB_URI, 
    { 
        useNewUrlParser: true,
        useUnifiedTopology: true  
    }, 
    () => console.log('MongoDB Connected')
)

app.listen(8000, () => {
    console.log('Server Connected')
})