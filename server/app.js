require('dotenv').config()
const express = require('express')
const app = express()
const PORT = process.env.PORT
const routes = require('./routes')
const mongoose = require('mongoose');
const cors = require('cors')
mongoose.set('useCreateIndex', true)

mongoose.set('useFindAndModify', false);
mongoose.connect(process.env.MONGODB_CONNECTION, {useNewUrlParser: true})
.then(function(success){
    console.log("succesfully connect to database")
})
.catch(function(err){
    console.log(err)
});

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use('/', routes)

app.use((err, req, res, next) => {
    if (err.code && err.code != 500) {
      res.status(err.code).json({
        message: err.message
      })
    }
    else if (err.name == 'ValidationError') {
      let message = ""
      for(let field in err.errors){
        message = err.errors[field].message
      }
      res.status(400).json({
        message
      })
    }
    else {
      res.status(500).json({
        message: 'Internal Server Error'
      })
    }
})

app.listen(PORT, () => {
    console.log(`Running on http://localhost:${PORT}`)
})
