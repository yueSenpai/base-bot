const { CommandInteraction, Client } = require("discord.js");

module.exports = {
    name: 'work',
    aliases: [],
    ownerOnly: false,
    userPerms: ["SEND_MESSAGES"],
    botPerms: ["SEND_MESSAGES"],
    usage: [''],
    examples: [""],
    description: "Permet de récuperer de l'argent toutes les 24h.",
    cooldown: 86000000,
    category: 'economy',

    /**
     * @param {CommandInteraction} interaction 
     * @param {Client} client
     */

    runInteraction: async (client, interaction, db) => {
        db.query(`SELECT * FROM economy WHERE guildID = ? AND userID = ?`, [interaction.guildId, interaction.user.id], async (err, req) => {
            if (req.length < 1) {

                db.query(`INSERT INTO economy (guildID, userID, coins) VALUES (?, ?, ?)`, [interaction.guild.id, interaction.user.id, '0']);

                return interaction.reply({ content: `Vous venez d'être enregistré dans la base de donnée.`, ephemeral: true });

            } else {
                const number = [20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 91, 92, 93, 94, 95, 96, 97, 98, 99, 100]
                let index = Math.floor(Math.random() * (number.length - 1))

                db.query(`UPDATE economy SET coins = ? WHERE guildID = ? AND userID = ?`, [parseInt(req[0].coins) + number[index], interaction.guildId, interaction.user.id])

                interaction.reply(`Vous avez obtenu ${number[index]} <:Torasdor:969166509756809216>.`)
            }
        })
    }
}