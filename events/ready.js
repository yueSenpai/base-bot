const client = require('..');
const chalk = require('chalk');

client.on('ready', async () => {
    console.log(chalk.red(`${client.user.tag} est connecté sur ${client.guilds.cache.size} serveurs`))

    await client.application.commands.set(client.commands.map(cmd => cmd));

    setInterval(async () => {
        client.user.setPresence({
            activities: [{ name: `${client.guilds.cache.size} serveurs`, type: "WATCHING" }],
            status: "dnd",
        });
    }, 5000);
})