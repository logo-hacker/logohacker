module.exports = function(req, res, next) {
    const fs = require('fs')
    const image = req.body.image
    const base64Data = image.replace(/^data:image\/png;base64,|^data:image\/jpeg;base64,/, "");
    const fileName = Date.now() + '.png'
    
    fs.writeFile(fileName, base64Data, 'base64', 
    function(err, data) {
    if (err) {
        console.log('err', err);
    }
        console.log('success');
        req.file = {}
        req.file.buffer = fs.readFileSync(fileName)
        req.file.originalname = Date.now() + fileName
        req.file.mimeType = 'image/png'
        fs.unlinkSync(fileName)
        next()
    });

}
