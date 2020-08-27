const express = require('express')
const path = require('path')
const router = require('./router/Router')

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(router)
app.use(express.static(path.join(__dirname, 'public',)))

app.set('view engine', 'ejs')







const server = app.listen(5000, function(err, res){
	if(err) throw err
	console.log('Sever started at 5000')
})