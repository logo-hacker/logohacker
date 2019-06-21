const express = require('express');
const routes = express.Router();
// const Authentication = require('../middlewares/authenticate')
const uploadToGCS = require('../middlewares/uploadToGCS')
const LogoController = require('../controllers/LogoController')
const users = require('../routes/users')
const base64Converter = require('../middlewares/base64Converter')

routes.use('/users', users)

routes.post('/logos', base64Converter, uploadToGCS.sendUploadToGCS,LogoController.create)

routes.get('*', (req,res) => {
    res.send('404 page not found')
})

module.exports = routes