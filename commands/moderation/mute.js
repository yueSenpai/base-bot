const { MessageEmbed } = require("discord.js");
const createID = require('../../structures/other/createID');
const ms = require('ms')

module.exports = {
    name: 'mute',
    aliases: [],
    ownerOnly: false,
    userPerms: ["MUTE_MEMBERS"],
    botPerms: ["MUTE_MEMBERS"],
    usage: 'mute [membre] [temps] <raison>',
    examples: ["mute lotilia 1h", "mute lotilia 1h tu as commis une infraction"],
    description: "Permet de mute un utilisateur.",
    cooldown: 10,
    category: 'moderation',
    options: [
        {
            name: 'target',
            description: "Sélectionnez l'utilisateur pour pouvoir le kick",
            type: 6,
            required: true,
        },
        {
            name: 'duration',
            description: "Sélectionnez le temps pour pouvoir mute l'utilisateur.Duration en anglais exemple 2hours.",
            type: 3,
            required: true
        },
        {
            name: 'reason',
            description: "Sélectionnez la raison du kick.",
            type: 3,
            required: false,
        },

    ],

    runInteraction: async (client, interaction, db) => {
        let user = interaction.options.getMember('target')

        let time = interaction.options.getString('duration')
        if (!parseInt(ms(time))) return interaction.reply("Le temps indiqué est invalide !")
        if (ms(time) > 2419200000) return interaction.reply("Le temps ne doit pas être supérieur à 28 jours !")

        let reason = interaction.options.getString('reason')
        if (!reason) reason = "Aucune raison donnée";

        if (interaction.user === undefined ? (user.id === interaction.user.id) : (user.id === interaction.user.id)) return interaction.reply("Vous ne pouvez pas vous rendre muet vous-même !")
        if (user.id === interaction.guild.ownerId) return interaction.reply("Vous ne pouvez pas rendre muet cette personne !")
        if (interaction.member.roles.highest.comparePositionTo(interaction.guild.members.cache.get(user.id).roles.highest) <= 0) return interaction.reply("Vous ne pouvez pas rendre muet cette personne !")
        if (interaction.guild.members.cache.get(user.id).isCommunicationDisabled()) return interaction.reply("Cette personne est déjà muette !")

        const ID = await createID("MUTE");

        db.query(`INSERT INTO mutes (userID, authorID, muteID, guildID, reason, date, time) VALUES (?, ?, ?, ?, ?, ?, ?)`, [user.id, interaction.user.id, ID, interaction.guild.id, reason, Date.now(), time])

        interaction.guild.members.cache.get(user.id).timeout(ms(time), reason)
        const embed = new MessageEmbed()
            .setColor(`RED`)
            .setThumbnail(user.user.displayAvatarURL())
            .setTimestamp()
            .setTitle(`<:speaker_muted:963603033604882442> MUTE`)
            .setDescription(`
        \n**Par:** ${interaction.user.tag}
        \n**Temps:** ${time}
        \n**Raison:** ${reason}
        \n**Server:** ${interaction.guild.name}
        `)

        interaction.reply({ embeds: [embed] })
    }
}