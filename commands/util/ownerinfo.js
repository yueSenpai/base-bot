const { MessageEmbed, MessageActionRow, MessageButton } = require("discord.js");
const config = require('../../config.json');

const button = new MessageActionRow().addComponents([
    new MessageButton()
        .setURL("https://www.instagram.com/lotilia_17/?hl=fr")
        .setStyle("LINK")
        .setLabel("Instagram"),

    new MessageButton()
        .setURL(config.paypal)
        .setLabel("Paypal")
        .setStyle("LINK")
])

module.exports = {
    name: 'ownerinfo',
    aliases: [],
    ownerOnly: false,
    usage: 'ownerinfo',
    examples: ['ownerinfo'],
    userPerms: ["SEND_MESSAGES"],
    botPerms: ["SEND_MESSAGES"],
    category: 'util',
    description: "Permet de voir les informations sur l'owner du bot.",
    cooldown: 0,

    runInteraction: async (client, interaction, db) => {
        const owner = client.users.cache.get(config.owner.id);

        const embed = new MessageEmbed()
            .setTitle("Information sur L'owner.")
            .setColor("RED")
            .setTimestamp()
            .setThumbnail(owner.displayAvatarURL({ dynamic: true }))
            .addFields([
                { name: "Nom:", value: `${config.owner.name}` },
                { name: "ID:", value: `${config.owner.id}` },
                { name: "Tag:", value: `${config.owner.tag}` },
                { name: "Travail sur:", value: `Un bot ▶ ${client.user.username}` },
                { name: "Localisation:", value: "France" },
            ])

        interaction.reply({ embeds: [embed], components: [button] });
    }
}