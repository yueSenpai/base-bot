const { MessageEmbed } = require("discord.js");
const createID = require('../../structures/other/createID');

module.exports = {
    name: 'kick',
    aliases: [],
    ownerOnly: false,
    userPerms: ["KICK_MEMBERS"],
    botPerms: ["KICK_MEMBERS"],
    usage: 'kick [membre] <raison>',
    examples: ["kick lotilia", "kick lotilia tu as commis une infraction"],
    description: "Permet de kick un utilisateur du serveur.",
    cooldown: 10,
    category: 'moderation',
    options: [
        {
            name: 'user',
            description: "Sélectionnez l'utilisateur pour pouvoir le kick",
            type: 6,
            required: true,
        },
        {
            name: 'reason',
            description: "Sélectionnez la raison du kick.",
            type: 3,
            required: false,
        }

    ],

    runInteraction: async (client, interaction, db) => {
        const member = interaction.options.getMember("user");

        let reason = interaction.options.getString("reason");
        if (!reason) reason = "Aucune raison donnée";
        if (!member.kickable) return interaction.reply({ content: "Ce membre ne peut pas être kick par le bot!" });

        const ID = await createID("KICK");

        const embed = new MessageEmbed()
            .setTitle('<a:nezukobye:964223477865398293> KICK')
            .setColor('RED')
            .setThumbnail(member.user.displayAvatarURL())
            .setTimestamp()
            .setDescription(`
            **Membre:** ${member.user.username}
        \n**Par:** ${interaction.user.tag}
        \n**Raison:** ${reason}
        `)
        interaction.reply({ embeds: [embed] })

        interaction.guild.members.cache.get(member.user.id).kick(`${reason} (kick par ${interaction.user.tag})`)

        if (reason.includes("'")) reason = reason.replace(/'/g, "\\'")

        db.query(`INSERT INTO kicks (userID, authorID, kickID, guildID, reason, date) VALUES (?, ?, ?, ?, ?, ?)`, [member.id, interaction.user.id, ID, interaction.guild.id, reason, Date.now()])
    }
}