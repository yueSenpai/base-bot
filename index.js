const { default: chalk } = require("chalk");
const { Client, Collection } = require("discord.js");
const db = require("./structures/database/database");
const logger = require('./structures/other/logger');
console.clear();

const client = new Client({
    intents: 98303,
    partials: ["MESSAGE", "CHANNEL", "REACTION", "USER"]
});

require('dotenv').config();

client.commands = new Collection();
client.aliases = new Collection();
client.events = new Collection();

module.exports = client;

//load the handler
['command', 'event'].forEach((handler) => {
    require(`./handlers/${handler}`)(client)
});

//anti crash
process.on("exit", code => {
    logger.client(`Le processus c'est arrété avec le code: ${code} !`);
});
process.on("uncaughtException", (err, origin) => {
    logger.error(`UNCOUGHT_EXEPTION: ${err}`)
    console.error(`Origine: ${origin}`)
});
process.on('unhandledRejection', (reason, promise) => {
    logger.warn(`UNHANDLED_REJECTION: ${reason}`)
    console.log(promise)
});
process.on("warning", (...args) => logger.warn(...args));

//connecting with a database
db.connect(function (err) {
    if (err) {
        console.log(err);
    } else {
        console.log(chalk.red(`Base de donnée connectée`))
    }
});

//connecting bot
client.login(process.env.TOKEN);
