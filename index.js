const fs = require('fs')
const express = require('express')
const pug = require('pug')
const app = express()

app.use(express.json())
app.set('view engine', 'pug'); // set the template engine to Pug

const view = pug.compileFile('index.pug') // prepare the Pug template for data insertion

app.post('/webhooks', function (req, res) {
	console.log(req.body); // debug
	var time = new Date()
	var source = view({ result: req.body, time: time.toDateString() }) // insert data into Pug template
	fs.writeFile('webhooks.html', source, function(error) { // write compiled template to HTML
	if (error) throw error
	console.log('Saved to HTML.') }) 
})

app.listen(3000, function () {
    console.log('Listening for webhooks on port 3000')
})