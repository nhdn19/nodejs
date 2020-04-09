const path = require('path')
const express = require('express')
const router = express.Router()

router.get('/home', async (req, res) => {
    try {
        res.sendFile(path.join(__dirname, '../public/home.html'))
    }
    catch (err) {
        res.json({message: err})
    }
})

router.get('/request.js', async (req, res) => {
    try {
        res.sendFile(path.join(__dirname, '../public/request.js'))
    }
    catch (err) {
        res.json({message: err})
    }
})

module.exports = router