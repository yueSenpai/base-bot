module.exports = {
    name: 'prefix',
    aliases: [],
    ownerOnly: false,
    userPerms: ["ADMINISTRATOR"],
    botPerms: ["ADMINISTRATOR"],
    usage: 'commande indisponible',
    examples: ['commande indisponible'],
    category: 'admin',
    description: "Permet de changer le prefix du bot.",
    cooldown: 10,

    run: async (client, message, args, db) => {
        db.query(`SELECT * FROM server WHERE guildID = ${message.guild.id}`, async (err, req) => {
            let prefix = args[0];
            if (!prefix) return message.channel.send("Veuillez spécifier un prefix.");

            const ancienPrefix = req[0].prefix;
            db.query(`UPDATE server SET prefix = ? WHERE guildID = ?`, [prefix, message.guild.id])

            message.channel.send(`Vous avez modifié le prefix. Il est passé de \`${ancienPrefix}\` à \`${prefix}\``)
        });
    },
}