const express = require('express');
const router = express.Router();
const credential = require('./../common/Secret')
const keyString = require('./../common/KeyString')

// Executes before every request in this file
router.use((req, res, next) => {
    // Check userId
    if (req.headers[keyString.USER_ID] === credential.UserId) {
        next()
        return
    }

    // Not matching userId
    res.statusCode = 404
    res.send("User not found")
    
})

// users/all : GET
router.get('/all', (req, res) => {
    res.json(
        {
            "name": "Manish",
            "id": 123,
            "website": "https://google.com",
            "location": "India",
            "Contact": "manish@email.com"
        }
    )
})

router.get('/:id', (req, res) => {
    res.send(`user with id: ${req.params.id} is NewUser`)
})

router.post('/new', (req, res) => {
    res.send(`created user with name: ${req.body["name"]}`)
})

// Important: Must export this otherwise it won't be usable
module.exports = router