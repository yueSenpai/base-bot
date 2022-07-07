module.exports = {
    name: 'antiraid',
    aliases: [],
    ownerOnly: false,
    userPerms: ["ADMINISTRATOR"],
    botPerms: ["MANAGE_GUILD"],
    usage: 'antiraid [choix: {on} {off}]',
    examples: ["antiraid choice on", "antiraid choice off"],
    description: "Empêche un serveur de se faire raid.",
    cooldown: 10,
    category: 'admin',
    options: [
        {
            name: 'choice',
            description: "Choisir d'activer ou désactiver l'antiraid.",
            type: 3,
            required: true,
            choices: [
                {
                    name: "on",
                    value: 'on'
                },
                {
                    name: 'off',
                    value: 'off'
                }
            ]
        }
    ],

    runInteraction: async (client, interaction, db) => {
        let choix = interaction.options.getString('choice');

        db.query(`SELECT * FROM server WHERE guildID = ${interaction.guild.id}`, async (err, req) => {

            if (req.length < 1) return interaction.reply("Ce serveur n'est pas encore enregistré !")
            if (req[0].raid === choix) return interaction.reply(`L'anti-raid est déjà ${choix === "on" ? "activé" : "désactivé"} !`)

            db.query(`UPDATE server SET raid = ? WHERE guildID = ?`, [choix, interaction.guild.id])

            interaction.reply(`L'anti-raid a été ${choix === "on" ? "activé" : "désactivé"} !`)
        })
    }
}