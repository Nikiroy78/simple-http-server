const express = require('express');

var app = express();
app.use(express.static('root'));

const port = !process.argv[2] ? 3000 : Number.isInteger(Number(process.argv[2])) ? Number(process.argv[2]) : 3000

app.listen(
	port, (err) => {
		if (err) throw err;
		else {
			console.log(`Successful runned 127.0.0.1:${port}`);
		}
	}
);