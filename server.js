const express = require('express');
const fs = require('fs');

var app = express();

const port = !process.argv[2] ? 3000 : Number.isInteger(Number(process.argv[2])) ? Number(process.argv[2]) : 3000

fs.readFile("./init.txt", "utf8", async (err, data) => {
	if (err) {
		throw err;
	}
	else {
		// console.log(data);
		let commands = data.split('\n');
		let options = {
			// dotfiles: 'ignore',
			// etag: false,
			// extensions: ['htm', 'html'],
			// index: "index.html",
			// maxAge: '1d',
			// redirect: true,
			// setHeaders: async (res, path, stat) => {
				// res.set('ЗАГОЛОВОК', ДАННЫЕ) СДЕЛАЕМ ПОЗЖЕ
			// }
		};
		let executor = require('./command-executor')(app, options);
		
		for (let command of commands) {
			executor.exec(command);
		}
		
		app.use(express.static('root', options));
	}
});

app.listen(
	port, (err) => {
		if (err) throw err;
		else {
			console.log(`Successful runned 127.0.0.1:${port}`);
		}
	}
);