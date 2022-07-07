const { MessageEmbed } = require("discord.js");
const createID = require('../../structures/other/createID')

module.exports = {
    name: 'ban',
    aliases: [],
    ownerOnly: false,
    userPerms: ["BAN_MEMBERS"],
    botPerms: ["BAN_MEMBERS"],
    usage: 'ban [membre] <raison>',
    examples: ["ban lotilia", 'ban lotilia tu as commis une infraction'],
    description: "Permet de bannir un utilisateur du serveur.",
    cooldown: 10,
    category: 'moderation',
    options: [
        {
            name: 'user',
            description: "Sélectionnez l'utilisateur pour pouvoir le bannir",
            type: 6,
            required: true,
        },
        {
            name: 'reason',
            description: "Sélectionnez la raison du ban.",
            type: 3,
            required: false,
        }

    ],

    runInteraction: async (client, interaction, db) => {
        const member = interaction.options.getMember("user");

        let reason = interaction.options.getString("reason");
        if (!reason) reason = "Aucune raison donnée";
        if (!member.bannable) return interaction.reply({ content: `Ce membre ne peut pas être ban par le bot.` })

        const ID = await createID("BAN");

        const embed = new MessageEmbed()
            .setTitle('<:Banhammer:230072259933503488> Ban')
            .setColor('RED')
            .setThumbnail(member.user.displayAvatarURL())
            .setTimestamp()
            .setDescription(`
            **Membre:** ${member.user.username}
        \n**Par:** ${interaction.user.tag}
        \n**Raison:** ${reason}
        `)
        interaction.reply({ embeds: [embed] })
            .then(async () => {

                await interaction.guild.members.cache.get(member.user.id).ban({ reason: `${reason} (Banni par ${interaction.user.tag})` })

                if (reason.includes("'")) reason = reason.replace(/'/g, "\\'")

                db.query(`INSERT INTO bans (userID, authorID, banID, guildID, reason, date, time) VALUES (?, ?, ?, ?, ?, ?, ?)`, [member.user.id, interaction.user.id, ID, interaction.guildId, reason, Date.now(), 'définitif'])
            })
    }
}