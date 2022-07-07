const { CommandInteraction, Client, MessageEmbed } = require("discord.js");

module.exports = {
    name: 'addmoney',
    aliases: [],
    ownerOnly: false,
    userPerms: ["ADMINISTRATOR"],
    botPerms: ["SEND_MESSAGES"],
    usage: [''],
    examples: [""],
    description: "Permet de donner de l'argent à un utilisateur",
    cooldown: 10,
    category: 'economy',
    options: [
        {
            name: 'user',
            description: 'Mentionnez un utilisateur.',
            type: 'USER',
            required: true
        },
        {
            name: 'coins',
            description: 'Choisir un montant.',
            type: 'NUMBER',
            required: true
        }
    ],

    /**
     * @param {CommandInteraction} interaction 
     * @param {Client} client
     */

    runInteraction: async (client, interaction, db) => {
        const target = interaction.options.getMember("user");
        const coins = interaction.options.getNumber('coins');

        db.query(`SELECT * FROM economy WHERE guildID = ? AND userID = ?`, [interaction.guild.id, interaction.user.id], async (err, req) => {

            if (req.length < 1) {

                db.query(`INSERT INTO economy (guildID, userID, coins) VALUES (?, ?, ?)`, [interaction.guild.id, interaction.user.id, '0']);
                return interaction.reply({ content: `Vous venez d'être enregistré dans la base de donnée.`, ephemeral: true });

            }
            if (coins > 2000) {
                interaction.reply({ content: `Votre sommes est supérieur à 2000coins.`, ephemeral: true })

            } else {
                db.query(`SELECT * FROM economy WHERE userID = ?`, [target.id], async (err, req) => {
                    if (req.length < 1) {

                        interaction.reply({ content: `Cette utilisateur n'est pas enregistré dans la base de donnée.`, ephemeral: true })

                    } else {
                        db.query(`UPDATE economy SET coins = coins + ? WHERE guildID = ? AND userID = ?`, [coins, interaction.guildId, target.user.id]);

                        const embed = new MessageEmbed()
                            .setDescription(` ${interaction.member} a donné ${coins} <:Torasdor:969166509756809216> à ${target.user.tag}`)
                            .addField(`** **`, `${target.user.tag} possède désormé ${parseInt(req[0].coins) + coins}`)
                            .setAuthor({ name: target.user.tag, iconURL: target.user.displayAvatarURL({ dynamic: true }) })

                        await interaction.reply({ embeds: [embed] })
                    }
                })
            }
        })
    }
}