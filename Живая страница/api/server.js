const express = require('express'),
			fs = require('file-system'),
			app = express(),
			cors = require('cors');

app.use(cors());
app.options('*', cors());

app.get('/',(req,res) => {
	let data = JSON.parse(fs.readFileSync('./data/data.json', 'utf8'));
	res.send(data);
});

app.listen(3000, () => console.log('running server...'));