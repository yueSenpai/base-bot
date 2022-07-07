const chalk = require('chalk');
const fs = require('fs');
let asciiTable = require('ascii-table');
const table = new asciiTable()

table.setHeading('Events', 'Stats').setBorder('|', '=', "0", "0");

module.exports = client => {
    fs.readdirSync('./events/').filter((file) => file.endsWith('.js')).forEach((event) => {
        require(`../events/${event}`);
        table.addRow(event.split('.js')[0], '✅')
    });

    console.log(chalk.greenBright(table.toString()))
}