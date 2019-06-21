const express = require('express');
const routes = express.Router();
// const Authentication = require('../middlewares/authenticate')
const uploadToGCS = require('../middlewares/uploadToGCS')
const LogoController = require('../controllers/LogoController')
// routes.use('/users', users)

routes.post('/logos', uploadToGCS.multer.single('image_url'), uploadToGCS.sendUploadToGCS ,LogoController.create)

routes.get('*', (req,res) => {
    res.send('404 page not found')
})

module.exports = routes