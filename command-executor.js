const fs = require('fs');
const mime = require('mime');

const route = (app, options, path, facticalPath) => {
	app.get(path, async (req, res) => {
		let data     = fs.readFileSync(`./root${facticalPath}`);
		let mimeType = mime.getType(`./root${facticalPath}`);
		
		res.set('Content-Type', mimeType);
		res.send(data);
	});
}

module.exports = (app, options) => ({
	exec : (command) => {
		switch (command.split(' ')[0]) {
			case '':
				return;
			case 'route':
				return route(app, options,
					command.split(' ')[1],
					command.split(' ')[2]
				);
			default:
				throw new Error(`Unknown command: ${command.split(' ')[0]}`);
		}
	}
});