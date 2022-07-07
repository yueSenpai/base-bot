const { CommandInteraction, Client, MessageEmbed } = require("discord.js");

module.exports = {
    name: 'transfert',
    aliases: [],
    ownerOnly: false,
    userPerms: ["SEND_MESSAGES"],
    botPerms: ["SEND_MESSAGES"],
    usage: [''],
    examples: [""],
    description: "Permet de transferer de l'argent à un utilisateur.",
    cooldown: 0,
    category: 'economy',
    options: [
        {
            name: 'user',
            description: 'Mentionnez l\'utilisateur correspondant',
            type: 'USER',
            required: true
        },
        {
            name: 'coins',
            description: 'Nombre de coins à transférer',
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
            if (coins > req[0].coins) {
                interaction.reply({ content: `Votre sommes est trop élevée.`, ephemeral: true })

            } else {
                db.query(`SELECT * FROM economy WHERE userID = ?`, [target.id], async (err, req) => {
                    if (req.length < 1) {

                        interaction.reply({ content: `Cette utilisateur n'est pas enregistré dans la base de donnée.`, ephemeral: true })

                    } else {
                        db.query(`UPDATE economy SET coins = coins - ? WHERE guildID = ? AND userID = ?`, [coins, interaction.guildId, interaction.user.id]);

                        db.query(`UPDATE economy SET coins = coins + ? WHERE guildID = ? AND userID = ?`, [coins, interaction.guildId, target.user.id]);

                        const embed = new MessageEmbed()
                            .setDescription(` ${interaction.member} a donné ${coins} <:Torasdor:969166509756809216> à ${target.user.tag}`)
                            .addField(`** **`, `${target.user.tag} possède désormé ${parseInt(req[0].coins) + coins}`)
                            .setAuthor({ name: target.user.tag, iconURL: target.user.displayAvatarURL({ dynamic: true }) })

                        interaction.reply({ embeds: [embed] })
                    }
                })
            }
        })
    }
}