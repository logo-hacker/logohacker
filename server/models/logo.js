const mongoose = require('mongoose');
mongoose.set('useCreateIndex', true)
const {Schema} = mongoose;

const logoSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    image_url: {
        type: String,
        required: true
    },
    userId : { type: Schema.Types.ObjectId, ref: 'Logo' }
}, {timestamps:true} );

const Logo = mongoose.model('Logo', logoSchema)

module.exports = Logo
