const Logo = require('../models/logo')

class LogoController {
    static filter (req, res, next) {
        let where = {}
        where["userId"] = req.decoded_id

        Logo.find(where, function (err, logos) {
          if (err) {
            next ({code: 500, message: err.message})
          } else {
            let output = []    
            for (let i = 0; i < logos.length; i++){   
              output.push(logos[i])
            }
            res.status(200).json(output)
            }
        })
      }

      static list (req, res, next) {
        Logo.find({},function (err, logos) {    
          if (err) {    
            next ({code: 500, message: err.message})    
          } else {    
            let output = []    
            for (let i = 0; i < logos.length; i++){    
              output.push(logos[i])    
            }    
            res.status(200).json(output)    
          }    
        })
      }

      
}

module.exports = LogoController
