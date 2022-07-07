const { MessageEmbed, MessageActionRow, MessageButton } = require("discord.js");

const button = new MessageActionRow()
    .addComponents([
        new MessageButton()
            .setURL("https://discord.gg/xKqzn5tXeH")
            .setStyle("LINK")
            .setLabel("Serveur support")
    ])

module.exports = {
    name: 'serverinfo',
    aliases: [],
    ownerOnly: false,
    userPerms: ["SEND_MESSAGES"],
    botPerms: ["SEND_MESSAGES"],
    usage: 'serverinfo',
    examples: ['serverinfo'],
    category: 'util',
    description: "Permet de voir les informations sur le serveur.",
    cooldown: 0,

    runInteraction: async (client, interaction, db) => {
        const vanityCode = interaction.guild.vanityURLCode;
        let vanityInvite = `https://discord.gg/${vanityCode}`;
        if (vanityCode === null) vanityInvite = "Aucune URL customisé pour le serveur.";

        const role = interaction.guild.roles.cache.filter((r) => r.id !== interaction.guild.id).map((rol) => rol.toString());

        let textChannel = interaction.guild.channels.cache.filter((c) => c.type === "GUILD_TEXT").size;
        let voiceChannel = interaction.guild.channels.cache.filter((c) => c.type === "GUILD_VOICE").size;

        const embed = new MessageEmbed()
            .setTitle(`Information sur le serveur: ${interaction.guild.name}`)
            .setColor("AQUA")
            .setTimestamp()
            .setThumbnail(interaction.guild.iconURL({ dynamic: true, size: 512 }))
            .addFields([
                { name: "Nom:", value: `${interaction.guild.name}`, inline: true },
                { name: "ID:", value: `${interaction.guild.id}`, inline: true },
                { name: "Owner:", value: `${(await interaction.guild.fetchOwner()).user}`, inline: true },
                { name: "Total de membres:", value: `${interaction.guild.memberCount.toString()}`, inline: true },
                { name: "Date de création:", value: `<t:${parseInt(interaction.guild.createdTimestamp / 1000)}:f> (<t:${parseInt(interaction.guild.createdTimestamp / 1000)}:R>)`, inline: true },
                { name: "Level de boost:", value: `${interaction.guild.premiumTier ? `${interaction.guild.premiumTier}` : 'aucun'}`, inline: true },
                { name: "Nombre de boost:", value: `${interaction.guild.premiumSubscriptionCount.toString() || '0'}`, inline: true },
                { name: "Vérification level:", value: `${interaction.guild.verificationLevel.toString()}`, inline: true },
                { name: "URL:", value: `${vanityInvite}`, inline: false },
                { name: "Total de channels:", value: `${textChannel + voiceChannel}`, inline: true },
                { name: "Total de channels textuel:", value: `${textChannel}`, inline: true },
                { name: "Total de channels vocal:", value: `${voiceChannel}`, inline: true },
                { name: "Emoji classique:", value: `${interaction.guild.emojis.cache.filter((e) => !e.animated).size}`, inline: true },
                { name: "Emoji animé:", value: `${interaction.guild.emojis.cache.filter((e) => e.animated).size}`, inline: true },
                {
                    name: `Rôles: [${role.length}]`, value: role.length < 15
                        ? role.join(' | ')
                        : role.length > 15
                            ? `${role.slice(0, 15).join(' | ')} | \`+ ${role.length - 15
                            } roles...\``
                            : 'aucun',
                    inline: false
                }
            ])
        interaction.reply({ embeds: [embed], components: [button], ephemeral: true })

    }
}