const { MessageEmbed } = require("discord.js");
const fetch = require('node-fetch');

module.exports = {
    name: 'userinfo',
    aliases: ["user", "ui"],
    ownerOnly: false,
    userPerms: ["SEND_MESSAGES"],
    botPerms: ["SEND_MESSAGES"],
    usage: 'userinfo <membre>',
    examples: ["userinfo", "userinfo lotilia"],
    description: "Permet de voir les informations sur un membre du serveur.",
    cooldown: 10,
    category: 'util',
    options: [
        {
            name: "user",
            description: "Sélectionnez un utilisateur à mentionner.",
            type: 6,
        },
    ],

    runInteraction: async (client, interaction, db) => {
        const member = interaction.options.getMember("user") || interaction.member;
        let booster = member.premiumSince == null ? 'Ne boost pas le serveur' : `<t:${Math.round(member.premiumSince / 1000)}:R>`;

        fetch(`https://discord.com/api/users/${member.user.id}`, {
            headers: {
                Authorization: `Bot ${client.token}`,
            },
        }).then((res) => res.json()).then((body) => {
            if (body.banner) {
                const extension = body.banner.startsWith('a_') ? '.gif' : '.png';
                const bannerUrl =
                    `https://cdn.discordapp.com/banners/${member.user.id}/${body.banner}${extension}?size=1024` ||
                    "L'utilisateur n'a pas de bannière!";
                const embed = new MessageEmbed()
                    .setAuthor({ name: `${member.user.tag} (${member.id})`, iconURL: member.user.bot ? "https://www.senioractu.com/photo/art/grande/19775462-23520308.jpg?v=1517185781" : "http://pm1.narvii.com/6871/fa3d32eaaba8b421e0fbda5bcc33b88ba6dd354dr1-735-876v2_uhq.jpg" })
                    .setColor("#8e48f7")
                    .setImage(member.user.displayAvatarURL())
                    .addFields([
                        { name: "Nom", value: `${member.displayName}`, inline: true },
                        { name: "Modérateur", value: `${member.permissions.has('KICK_MEMBERS') ? '🟢' : '🔴'}`, inline: true },
                        { name: "Bot", value: `${member.user.bot ? '🟢' : '🔴'}`, inline: true },
                        { name: "Roles", value: `${member.roles.cache.size - 1}` },
                        { name: "A créé son compte le", value: `<t:${parseInt(member.user.createdTimestamp / 1000)}:f> (<t:${parseInt(member.user.createdTimestamp / 1000)}:R>)` },
                        { name: "A rejoint le serveur le", value: `<t:${parseInt(member.joinedTimestamp / 1000)}:f> (<t:${parseInt(member.joinedTimestamp / 1000)}:R>)` },
                        { name: "Dernier boost mis sur le serveur:", value: `${booster}` }
                    ])
                    .setImage(bannerUrl)
                    .setThumbnail(member.user.displayAvatarURL({ dynamic: true, size: 512 }))
                interaction.reply({ embeds: [embed] });
            } else {
                if (body.accent_color) {
                    const bannerColor = body.accent_color;
                    const embed = new MessageEmbed()
                        .setAuthor({ name: `${member.user.tag} (${member.id})`, iconURL: member.user.bot ? "https://www.senioractu.com/photo/art/grande/19775462-23520308.jpg?v=1517185781" : "http://pm1.narvii.com/6871/fa3d32eaaba8b421e0fbda5bcc33b88ba6dd354dr1-735-876v2_uhq.jpg" })
                        .setColor("#8e48f7")
                        .setImage(member.user.displayAvatarURL({ dynamic: true }))
                        .addFields([
                            { name: "Nom", value: `${member.displayName}`, inline: true },
                            { name: "Modérateur", value: `${member.permissions.has('KICK_MEMBERS') ? '🟢' : '🔴'}`, inline: true },
                            { name: "Bot", value: `${member.user.bot ? '🟢' : '🔴'}`, inline: true },
                            { name: "Roles", value: `${member.roles.cache.size - 1}` },
                            { name: "A créé son compte le", value: `<t:${parseInt(member.user.createdTimestamp / 1000)}:f> (<t:${parseInt(member.user.createdTimestamp / 1000)}:R>)` },
                            { name: "A rejoint le serveur le", value: `<t:${parseInt(member.joinedTimestamp / 1000)}:f> (<t:${parseInt(member.joinedTimestamp / 1000)}:R>)` },
                            { name: "Dernier boost mis sur le serveur:", value: `${booster}` }
                        ])
                    interaction.reply({ embeds: [embed] });
                } else {
                    const embed = new MessageEmbed()
                        .setAuthor({ name: `${member.user.tag} (${member.id})`, iconURL: member.user.bot ? "https://www.senioractu.com/photo/art/grande/19775462-23520308.jpg?v=1517185781" : "http://pm1.narvii.com/6871/fa3d32eaaba8b421e0fbda5bcc33b88ba6dd354dr1-735-876v2_uhq.jpg" })
                        .setColor("#8e48f7")
                        .setImage(member.user.displayAvatarURL({ dynamic: true }))
                        .addFields([
                            { name: "Nom", value: `${member.displayName}`, inline: true },
                            { name: "Modérateur", value: `${member.permissions.has('KICK_MEMBERS') ? '🟢' : '🔴'}`, inline: true },
                            { name: "Bot", value: `${member.user.bot ? '🟢' : '🔴'}`, inline: true },
                            { name: "Roles", value: `${member.roles.cache.size - 1}` },
                            { name: "A créé son compte le", value: `<t:${parseInt(member.user.createdTimestamp / 1000)}:f> (<t:${parseInt(member.user.createdTimestamp / 1000)}:R>)` },
                            { name: "A rejoint le serveur le", value: `<t:${parseInt(member.joinedTimestamp / 1000)}:f> (<t:${parseInt(member.joinedTimestamp / 1000)}:R>)` },
                            { name: "Dernier boost mis sur le serveur:", value: `${booster}` }
                        ])
                    interaction.reply({ embeds: [embed] });
                }
            }
        });
    }
}