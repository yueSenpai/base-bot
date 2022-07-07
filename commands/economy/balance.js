const { CommandInteraction, Client, MessageEmbed } = require("discord.js");

module.exports = {
    name: 'balance',
    aliases: [],
    ownerOnly: false,
    userPerms: ["SEND_MESSAGES"],
    botPerms: ["SEND_MESSAGES"],
    usage: [''],
    examples: [""],
    description: "Permet de voir l'argent que vous possédez.",
    cooldown: 10,
    category: 'economy',
    options: [
        {
            name: 'user',
            description: 'Mentionnez un utilisateur.',
            type: 'USER',
            required: false
        }
    ],

    /**
     * @param {CommandInteraction} interaction 
     * @param {Client} client
     */

    runInteraction: async (client, interaction, db) => {
        const target = interaction.options.getMember("user") || interaction.member;
        db.query(`SELECT * FROM economy WHERE guildID = ? AND userID = ?`, [interaction.guild.id, target.id], async (err, req) => {

            if (req.length < 1) {
                db.query(`INSERT INTO economy (guildID, userID, coins) VALUES (?, ?, ?)`, [interaction.guild.id, interaction.user.id, '0']);
                return interaction.reply({ content: `Vous venez d'être enregistré dans la base de donnée.`, ephemeral: true });

            } else {
                const embed = new MessageEmbed()
                    .setDescription(` ${target.user.tag} à ${req[0].coins} <:Torasdor:969166509756809216>`)
                    .setAuthor({ name: target.user.tag, iconURL: target.user.displayAvatarURL({ dynamic: true }) })

                await interaction.reply({ embeds: [embed] })
            }
        })
    }
}