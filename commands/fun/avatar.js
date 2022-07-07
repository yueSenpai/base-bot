const { MessageEmbed } = require("discord.js");

module.exports = {
    name: 'avatar',
    aliases: [],
    ownerOnly: false,
    userPerms: ["SEND_MESSAGES"],
    botPerms: ["SEND_MESSAGES"],
    usage: 'avatar <membre>',
    examples: ['avatar', 'avatar lotilia'],
    description: "Permet de voir l'avatar d'un utilisateur.",
    cooldown: 10,
    category: 'fun',
    options: [
        {
            name: "user",
            description: "Sélectionne un membre.",
            type: "USER",
            required: false
        }
    ],

    runInteraction: async (client, interaction, db) => {
        const target = interaction.options.getMember("user") || interaction.member;
        const embed = new MessageEmbed()
            .setTitle(`Avatar de ${target.user.tag}`)
            .setImage(target.displayAvatarURL({ dynamic: true, size: 512 }))
            .setTimestamp()

        interaction.reply({ embeds: [embed] })

    }
}