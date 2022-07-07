const chalk = require('chalk');
const fs = require('fs');
let asciiTable = require('ascii-table');
const table = new asciiTable()

table.setHeading('Commands', 'Stats').setBorder('|', '=', "0", "0");

module.exports = client => {
    fs.readdirSync('./commands/').forEach(dir => {
        const files = fs.readdirSync(`./commands/${dir}/`).filter(file => file.endsWith('.js'));
        if (!files || files.length <= 0) console.log(chalk.red("Commandes - 0"))
        files.forEach(file => {
            let command = require(`../commands/${dir}/${file}`)
            if (command) {
                client.commands.set(command.name, command)
                if (command.aliases && Array.isArray(command.aliases)) {
                    command.aliases.forEach(alias => {
                        client.aliases.set(alias, command.name)
                    });

                    table.addRow(command.name, '✅')
                } else {
                    table.addRow(file, '❌')
                }
            }
        })
    });
    console.log(chalk.blue(table.toString()))
}