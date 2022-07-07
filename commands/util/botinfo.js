const { MessageEmbed, version: djsversion } = require("discord.js");
const version = require("../../package.json").version;
const pretty = require("pretty-ms")

module.exports = {
    name: 'botinfo',
    aliases: [],
    ownerOnly: false,
    userPerms: ["SEND_MESSAGES"],
    botPerms: ["SEND_MESSAGES"],
    usage: 'botinfo',
    examples: ['botinfo'],
    category: 'util',
    description: "Permet de voir les informations du bot.",
    cooldown: 10,

    runInteraction: async (client, interaction, db) => {
        const embed = new MessageEmbed()
            .setTitle(`${client.user.username}`)
            .setTimestamp()
            .setThumbnail(client.user.displayAvatarURL({ size: 512, format: 'png' }))
            .setColor('AQUA')
            .addFields([
                { name: '<:mb_robot:885860468562985030> Client', value: `${client.user.tag} (${client.user.id})`, inline: true },
                { name: '📊 Commandes totales', value: `${client.commands.size}`, inline: true },
                { name: '📈 Serveurs', value: `${client.guilds.cache.size.toLocaleString()} Serveurs`, inline: true },
                { name: '📈 Utilisateurs', value: `${client.guilds.cache.reduce((a, b) => a + b.memberCount, 0).toLocaleString()} utilisateurs`, inline: true },
                { name: '<:creativeteam:938013542743961620> Date de création', value: `<t:${parseInt(client.user.createdTimestamp / 1000)}:f> (<t:${parseInt(client.user.createdTimestamp / 1000)}:R>)`, inline: true },
                { name: '<:nodejs:645263364758700032> Node.js', value: `${process.version}`, inline: true },
                { name: '<:discordjs:948220786697703494> Discord.js version', value: `v${djsversion}`, inline: true },
                { name: '🆚 Version', value: `v${version}`, inline: true },
                { name: '<:mb_robot:885860468562985030> Bot uptime', value: `${pretty(client.uptime)}`, inline: true },
                { name: '? Latence', value: `${client.ws.ping} ms`, inline: true }
            ])

        interaction.reply({ embeds: [embed] })

    }
}