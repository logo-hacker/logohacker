const express = require('express');
const routes = express.Router();
const UserController = require('../controllers/UserController')

routes.post('/login', UserController.login)
routes.post('/register', UserController.register)
routes.post('/loginGoogle', UserController.loginGoogle)

routes.get('*', (req,res) => {
    res.send('404 page not found')
})

module.exports = routes