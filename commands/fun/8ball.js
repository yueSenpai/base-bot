const { MessageEmbed } = require("discord.js");

let reponses = [
    "Oui.",
    "Non.",
    "Mes sources disent oui.",
    "Le plus probable.",
    "idk",
    "peut-être un jour",
    "Bonnes perspectives.",
    "Les signes pointent vers oui.",
    "Absolument",
    "Nope.",
    "Non merci, je n'y arriverai past.",
    "Certainement pas!",
    "C'est certain.",
    "C'est décidément ainsi.",
    "Sans aucun doute.",
    "Oui - définitivement.",
    "Vous pouvez vous y fier.",
    "Comme je le vois oui.",
    "J'espere",
    "Même pas dans tes rêves",
    "POURQUOI VOULEZ-VOUS Y PENSER ?!?!",
    "Réessayez plus tard",
    "JAMAIS",
    "Qui s'en soucie même?",
    "Désolé... mais non",
    "Probablement."
];

module.exports = {
    name: '8ball',
    aliases: [],
    ownerOnly: false,
    userPerms: ["SEND_MESSAGES"],
    botPerms: ["SEND_MESSAGES"],
    usage: '8ball [question]',
    examples: ['8ball lotilia est-il le meilleur bot ?'],
    description: "Pose une question au bot pour qu'il te donne une réponse aléatoire !",
    cooldown: 10,
    category: 'fun',
    options: [
        {
            name: "question",
            description: "Posez une question.",
            type: 3,
            required: true
        }
    ],

    runInteraction: async (client, interaction, db) => {

        const question = interaction.options.getString('question');
        if (!question) return interaction.reply("Veuillez fournir une question.");

        const rep = Math.floor(Math.random() * reponses.length);

        const embed = new MessageEmbed()
            .setColor('BLUE')
            .setThumbnail(interaction.user.displayAvatarURL({ dynamic: true }))
            .setTitle('🎱 8ball')
            .addFields([
                { name: `${interaction.user.username} à posé la question`, value: question, inline: false },
                { name: `Réponse`, value: reponses[rep], inline: false },
            ])
            .setTimestamp();

        interaction.reply({ embeds: [embed] });

    }
}