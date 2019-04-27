const chalk = require('chalk');

const log = (...messages) => 
	console.log(
		chalk.green(...messages)
	);

module.exports = {
	log,
}