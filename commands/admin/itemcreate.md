const { CommandInteraction, Client, MessageEmbed, MessageActionRow, MessageSelectMenu } = require("discord.js");

module.exports = {
    name: 'configshop',
    aliases: [],
    ownerOnly: false,
    userPerms: ["ADMINISTRATOR"],
    botPerms: ["MANAGE_GUILD"],
    usage: '',
    examples: [""],
    description: "Configurer le shop",
    cooldown: 10,
    category: 'admin',
    options: [
        {
        }
    ],

    /**
     * @param {Client} client 
     * @param {CommandInteraction} interaction 
     */

    runInteraction: async (client, interaction, db) => {

        const filter = i => i.user.id === interaction.user.id;

        const starter = new MessageEmbed()
            .setColor('AQUA')
            .setDescription(`ITEM BUILD STARTED`);

        const builder0 = new MessageEmbed()
            .setColor('AQUA')
            .setDescription(`Veuillez définir le nom de l'item`);

        const builder01 = new MessageEmbed()
            .setColor('AQUA')
            .setDescription(`Veuillez entrer l'ID de votre item`);

        const finish = new MessageEmbed()
            .setColor('AQUA')
            .setDescription(`Item enregistré`);

        interaction.reply({ embeds: [starter] }).catch(e => { });

        interaction.reply({ embeds: [builder0] }).then(() => {
            interaction.channel.awaitMessageComponent({ filter, max: 1, time: 100000, error: ['time'] }).then(async collected => {
                let content0 = collected.first().content.toLowerCase()
                let content01 = Number(collected.first().content)

                if (content01 === 'end') return interaction.reply({ content: `Item builder annulé` }).catch(e => { })

                if (!content0) return interaction.reply({ content: `ID invalide` })

                
            })
        })
    }
}