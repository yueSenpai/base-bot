const { CommandInteraction, Client, MessageEmbed, MessageActionRow, MessageSelectMenu } = require("discord.js");

module.exports = {
    name: 'shop',
    aliases: [],
    ownerOnly: false,
    userPerms: ["SEND_MESSAGES"],
    botPerms: ["MANAGE_GUILD"],
    usage: '',
    examples: [""],
    description: "Configurer le shop",
    cooldown: 10,
    category: 'admin',
    options: [
        {
        }
    ],

    /**
     * @param {Client} client 
     * @param {CommandInteraction} interaction 
     */

    runInteraction: async (client, interaction, db) => {
        let item = [];

        db.query(`SELECT * FROM shop WHERE guildID = ?`, [interaction.guildId], async (err, req) => {
            if (req[0]) {
                await req.forEach(r => {
                    item.push()
                });
            }
        })
    }
}