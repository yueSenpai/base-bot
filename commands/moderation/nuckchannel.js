const { MessageEmbed } = require("discord.js")

module.exports = {
    name: 'nuckchannel',
    aliases: [],
    ownerOnly: false,
    userPerms: ["MANAGE_CHANNELS"],
    botPerms: ["MANAGE_CHANNELS"],
    usage: 'nuckchannel',
    examples: ['nuckchannel'],
    description: "Permet d'éffacer un salon et de le recréer directement.",
    cooldown: 10,
    category: 'moderation',

    runInteraction: async (client, interaction, db) => {
        interaction.channel.clone().then((ch) => {
            ch.setParent(interaction.channel.parentId);
            ch.setPosition(interaction.channel.position);
            interaction.channel.delete();

            ch.send({
                embeds: [
                    new MessageEmbed()
                        .setTitle('Les messages de ce channel ont été supprimé !')
                        .setImage(
                            'https://tenor.com/view/explosion-mushroom-cloud-atomic-bomb-bomb-boom-gif-4464831'
                        )
                        .setColor('RED')
                        .setFooter({ text: `Action réalisée par ${interaction.user.tag}` }),
                ],
            }).then((m) => m.delete({ timeout: 7000 }));
        });
    }
}