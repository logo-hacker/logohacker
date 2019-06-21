const Logo = require('../models/logo')

class LogoController {
    static create(req, res) {
        const {name, userId} = req.body
        let image_url = req.file.cloudStoragePublicUrl

        Logo
        .create({name,image_url,userId})
        .then(logo => {
            console.log(logo);
            res.status(201).json(logo)
        })
        .catch(err => {
            console.log(err);
            res.status(500).json('Internal server error')
        })
    }
}

module.exports = LogoController
