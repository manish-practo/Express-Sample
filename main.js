const express = require('express');
const statusCode = require('./common/StatusCode');
const credential = require('./common/Secret')
const keyString = require('./common/KeyString')
const app = express();
const port = 3000;

// Must be the first middleware
app.use(express.urlencoded({extended: true}));
app.use(express.json()) // To parse the incoming requests with JSON payloads

// Root request router
app.use((req, res, next) => {
    console.log("Main request handler => Root router")

    // check username and password
    if (req.headers[keyString.USER_NAME] === credential.UserName || 
        req.headers[keyString.PASSWORD] === credential.password) {
            // farward to actual router
            next()
            return            
    }

    // Unautorized request
    res.statusCode = statusCode.UNAUTORIZED
    res.send(`Useername (${req.headers['username']}) or password (${req.headers['password']}) does not match!`)
})

// use routers - Users
app.use('/users', require('./routes/userRouter'))
app.use('/article', require('./routes/articleRouter'))

// start
app.listen(port, () => {
    console.log(`Listening at http://localhost:${port}`)
})