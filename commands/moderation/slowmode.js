module.exports = {
    name: 'slowmode',
    aliases: [],
    ownerOnly: false,
    userPerms: ["MANAGE_GUILD"],
    botPerms: ["MANAGE_GUILD"],
    usage: 'slowmode [temps]',
    examples: ['slowmode 1h'],
    description: "Permet de mettre un salon en mode lent.",
    cooldown: 10,
    category: 'moderation',
    options: [
        {
            name: 'duration',
            description: "Sélectionnez le temps désiré pour activer le mode lent.",
            type: 3,
            required: true,
        },
    ],

    runInteraction: async (client, interaction, db) => {
        const duration = interaction.options.getString("duration");
        const amount = parseInt(duration);

        if (isNaN(amount)) return interaction.reply({ content: "Cela ne semble pas être une valeur valide." });

        if (duration === amount + "s") {
            interaction.channel.setRateLimitPerUser(amount);
            if (amount > 1) {
                interaction.reply({ content: `Le mode lent est maintenant activer pour ${amount} secondes` });
                return;
            } else {
                interaction.reply({ content: `Le mode lent est maintenant activer pour ${amount} seconde` });
                return;
            }

        }
        if (duration === amount + "min") {
            interaction.channel.setRateLimitPerUser(amount * 60);
            if (amount > 1) {
                interaction.reply({ content: `Le mode lent est maintenant activer pour ${amount} minutes` });
                return;
            } else {
                interaction.reply({ content: `Le mode lent est maintenant activer pour ${amount} minute` });
                return;
            }
        }
        if (duration === amount + "h") {
            interaction.channel.setRateLimitPerUser(amount * 60 * 60);
            if (amount > 1) {
                interaction.reply({ content: `Le mode lent est maintenant activer pour ${amount} heures` });
                return;
            } else {
                interaction.reply({ content: `Le mode lent est maintenant activer pour ${amount} heure` });
                return;
            }
        } else {
            interaction.reply({ content: `Vous ne pouvez définir que les secondes (s), les minutes (min) et les heures (h)`, ephemeral: true })
        }
    }
}