const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'unmute',
    aliases: [],
    ownerOnly: false,
    userPerms: ["MUTE_MEMBERS"],
    botPerms: ["MUTE_MEMBERS"],
    usage: 'unmute [membre]',
    examples: ['unmute lotilia'],
    description: "Permet d'unmute un utilisateur du serveur!",
    cooldown: 10,
    category: 'moderation',
    options: [
        {
            name: 'target',
            description: "Sélectionnez l'utilisateur pour pouvoir l'unmute.",
            type: "USER",
            required: true,
        },
    ],

    runInteraction: async (client, interaction, db) => {
        const target = interaction.options.getMember("target");

        const nomuteEmbed = new MessageEmbed()
            .setColor("RED")
            .setDescription(`Ce membre ne peut pas être démute, car il n'est pas mute`)

        if (!target.isCommunicationDisabled()) return message.reply({ embeds: [nomuteEmbed], ephemeral: true });

        target.timeout(null);

        const embed = new MessageEmbed()
            .setColor("RED")
            .setThumbnail(target.user.displayAvatarURL())
            .setTimestamp()
            .setTitle("UNMUTE")
            .setDescription(`
            **Membre:** ${target}
            \n**Par:** ${interaction.user.username}
            `)
        interaction.reply({ embeds: [embed] })
    }
}