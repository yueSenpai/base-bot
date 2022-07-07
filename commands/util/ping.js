const { MessageEmbed } = require("discord.js");
const pretty = require('pretty-ms');

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
        const tryPong = await interaction.reply({ content: "** **", fetchReply: true })

        const embed = new MessageEmbed()
            .setTitle("🏓 pong !")
            .setThumbnail(client.user.displayAvatarURL())
            .addFields(
                [
                    { name: `Latence API`, value: `\`\`\`${client.ws.ping}ms\`\`\``, inline: true },
                    { name: `Latence BOT`, value: `\`\`\`${tryPong.createdTimestamp - interaction.createdTimestamp}ms\`\`\``, inline: true },
                    { name: "Uptime:", value: `\`\`\`yml\nStatus : Online\nUptime : ${pretty(client.uptime)}\n\`\`\`` }
                ],
            )
            .setTimestamp()
            .setFooter({ text: interaction.user.username, iconURL: interaction.user.displayAvatarURL() })

        interaction.editReply({ content: " ", embeds: [embed] });
    }
}