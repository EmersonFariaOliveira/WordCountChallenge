const cors = require('cors')
const express = require('express')
const bodyParser = require('body-parser');

const app = express()
const port = 8000

// support parsing of application/json type post data
app.use(bodyParser.json());
app.use(cors())

app.get('/', (req, res) => {
	res.send({message:'Hello World!'})
})

app.post('/wordCounting', (req, res) => {

	// console.log(req.body)

	// Initializing textLen variable with an size 0
	let textLen = 0

	// Check if text is present on json received
	if (req.body.text) {
		let text = req.body.text
		// Get the number of words from text received
		// match any non-whitespace sequences
		textLen = text.match(/\S+/g).length
	}

	if (textLen) {
		res.status(200).send({"count":textLen})
	} else {
		res.status(400).send({ message: "Some text input is required!" })
	}

})

app.listen(port, () => {
	console.log(`Example app listening on port ${port}`)
})