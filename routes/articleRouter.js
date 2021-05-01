const express = require('express')
const router = express.Router()
const keyString = require('./../common/KeyString')
const credential = require('./../common/Secret')
const statusCode = require('./../common/StatusCode')

router.use((req, res, next) => {
    if (req.headers[keyString.USER_ID] === credential.UserId) {
        next()
        return
    }

    res.sendStatus = statusCode.UNAUTORIZED
    res.send('User is not authorized.')
})

function checkPostRequestAuth (req, res, next) {
    if (req.headers[keyString.ARTICLE_TOEKN] === credential.ArticleToken) {
        next()
        return
    }

    res.statusCode = statusCode.UNAUTORIZED
    res.send('Article token is required!')
}

function getArticles(req, res, next) {
    if (req.headers[keyString.ARTICLE_ID] === undefined) {
        res.statusCode = statusCode.NOT_FOUND
        res.send('Article id can not be empty!')
        return
    }

    res.send(`There are many arcticles with id: ${req.headers[keyString.ARTICLE_ID]}`)
}

router.get('/all', [checkPostRequestAuth, getArticles])

module.exports = router