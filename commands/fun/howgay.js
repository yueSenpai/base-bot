const { MessageEmbed } = require("discord.js");

module.exports = {
    name: 'howgay',
    aliases: [],
    ownerOnly: false,
    userPerms: ["SEND_MESSAGES"],
    botPerms: ["SEND_MESSAGES"],
    usage: 'howgay <membre>',
    examples: ['howgay', 'howgay lotilia'],
    description: "Permet de voir le à qu'elle point une personne est homosexuel.",
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
        const rng = Math.floor(Math.random() * 101);

        const embed = new MessageEmbed()
            .setTitle(`Test de Gaytitude`)
	    .setDescription(`${target.user.tag} est gay à ${rng}%`)
            .setTimestamp()  
	    .setThumbnail("https://www.ace.asso.fr/wp-content/uploads/2020/03/6-illu-arc-en-ciel.png")      

        interaction.reply({ embeds: [embed] })
    }
}