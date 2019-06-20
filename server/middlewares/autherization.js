const Logo = require('../models/logo')

module.exports = (req, res, next) => {
    if(req.headers.hasOwnProperty('token')) {
        Logo.findById(req.params.id)
        .then((logo) => {
            if(logo) {
                if(logo.userId.toString()==req.decoded.id) {
                    next()  
                }else{
                    res.status(403).json({ err: 'Not authorize' });
                }
            }
        })
        .catch(err => {
            res.status(500).json({'msg': 'Request error'})
        })
    }else{
        res.status(403).json({'err': 'Not authorize'})
    }
}