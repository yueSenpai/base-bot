const { MessageEmbed } = require("discord.js");

module.exports = {
    name: 'ping',
    description: 'Permet de connaitre la latence du bot.',
    aliases: [],
    ownerOnly: false,
    userPerms: ["SEND_MESSAGES"],
    botPerms: ["SEND_MESSAGES"],
    usage: ['ping'],
    examples: ['ping'],
    category: 'util',
    cooldown: 0,

    runInteraction: async (client, interaction) => {

        interaction.editReply({ content: "pong" });
    }
}
