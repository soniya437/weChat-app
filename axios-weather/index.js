const express = require('express')

const route = require('./route/route')
const app = express()

app.use(express.json())

app.use('/',route)

app.listen(5000, ()=>{
    console.log("Server is running on port 5000");
})