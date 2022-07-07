module.exports = {
    name: 'clear',
    aliases: [],
    ownerOnly: false,
    userPerms: ["MANAGE_MESSAGES"],
    botPerms: ["MANAGE_MESSAGES"],
    usage: 'clear [message] <membre>',
    examples: ['clear 10', 'clear 10 lotilia'],
    description: "Supprimer un nombre de message spécifique sur un salon ou un utilisateur",
    cooldown: 10,
    category: 'moderation',
    options: [
        {
            name: 'message',
            description: "Le nombre de message à supprimer",
            type: 10,
            required: true,
        },
        {
            name: 'target',
            description: "Sélectionnez l'utilisateur pour la suppression de message",
            type: 6,
            required: false,
        }
    ],

    runInteraction: async (client, interaction, db) => {
        const amountToDelete = interaction.options.getNumber("message");
        if (amountToDelete > 100 || amountToDelete < 0) return interaction.reply("Le \`NOMBRE\` doit être inférieurà 100 et supérieur à 0")

        const target = interaction.options.getMember("target");

        const messageToDelete = await interaction.channel.messages.fetch();

        if (target) {
            let i = 0;
            const filteredTargetMessages = [];
            (await messageToDelete).filter(msg => {
                if (msg.author.id == target.id && amountToDelete > i) {
                    filteredTargetMessages.push(msg); i++;
                }
            });
            await interaction.channel.bulkDelete(filteredTargetMessages, true).then(messages => {
                interaction.reply(`J'ai supprimé ${messages.size} messages sur l'utilisateur ${target}`)
            });
        } else {
            await interaction.channel.bulkDelete(amountToDelete, true).then(messages => {
                interaction.reply(`J'ai supprimé ${messages.size} messages sur ce salon.`)
            });
        }

    }
}