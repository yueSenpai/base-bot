module.exports = {
    name: 'unban',
    aliases: [],
    ownerOnly: false,
    userPerms: ["BAN_MEMBERS"],
    botPerms: ["BAN_MEMBERS"],
    usage: 'unban [id membre]',
    examples: ['unban 526153926916177920'],
    description: "Permet d'unban un utilisateur du serveur!",
    cooldown: 10,
    category: 'moderation',
    options: [
        {
            name: 'id',
            description: "Sélectionnez l'id de l'utilidsateur à unban.",
            type: 3,
            required: true,
        },
    ],

    runInteraction: async (client, interaction, db) => {

        const user = interaction.options.getString('id');

        if (!interaction.guild.bans.fetch()) return interaction.reply("Aucune personne trouvée dans les bannissements !");

        interaction.guild.members.unban(user);

        interaction.reply(`Le membre a été débanni par ${interaction.user === undefined ? interaction.user.tag : interaction.user.tag} avec succès !`)
    }
}