const chalk = require('chalk');

const log = (...messages) => 
	console.log(
		chalk.cyan(...messages)
	);

const logBgGreen = (...messages) => 
	console.log(
		chalk.bgGreen(...messages)
	);

module.exports = {
	log,
	logBgGreen,
}