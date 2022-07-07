const { MessageEmbed } = require('discord.js');
const client = require('..');
const db = require('../structures/database/database')

client.on('messageCreate', async message => {
    if (message.author.bot) return;

    db.query(`SELECT * FROM server WHERE guildID = ?`, [message.guild.id], async (err, req) => {
        if (req.length < 1) {
            db.query(`INSERT INTO server (guildID, prefix) VALUES (?, ?)`, [message.guild.id, 'l!'])

            return message.channel.send(`Le bot va vous enregistrer dans la base de donnée.`)
        }
        if (message.content === `<@${client.user.id}>` || message.content === `<@!${client.user.id}>`) {
            const embed = new MessageEmbed()
                .setTitle(`Besoin d'aide ?`)
                .setDescription(`Le bot est seulement disponible en slash commande, pour plus de commande \`/help\``)
                .setColor('BLURPLE')

            message.channel.send({ embeds: [embed] })
        };
    });
})