// Imports
const cors = require('cors')
const express = require('express')
const bodyParser = require('body-parser');

// Creating the server object and define the port
const app = express()
const port = 8000

// support parsing of application/json type post data
app.use(bodyParser.json());
app.use(cors())

// Default route
app.get('/', (req, res) => {
	res.send({message:'Hello World!'})
})

// Main route of Word Counting
app.post('/wordCounting', (req, res) => {

	// Initializing textLen variable with an size 0
	let textLen = 0

	// Check if text is present on json received
	if (req.body.text) {
		let text = req.body.text
		try {
			// Get the number of words from text received
			// match any non-whitespace sequences
			textLen = text.match(/\S+/g).length
		} catch (error) {
			console.log(error.message)
			textLen = 0
		}
	}

	// If testLen > 0
	if (textLen) {
		res.status(200).send({"count":textLen})
	} else {
		res.status(400).send({ message: "Some text input is required!" })
	}

})

// Service start
app.listen(port, () => {
	console.log(`Example app listening on port ${port}`)
})