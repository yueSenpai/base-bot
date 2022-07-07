const { MessageEmbed } = require('discord.js');
const { readdirSync } = require("fs");
const commandFolder = readdirSync("./commands");

module.exports = {
    name: 'help',
    aliases: [],
    ownerOnly: false,
    userPerms: ["SEND_MESSAGES"],
    botPerms: ["SEND_MESSAGES"],
    description: "Permet d'avoir une aide sur les commandes.",
    cooldown: 0,
    usage: 'help <commande>',
    examples: ['help', 'help ping'],
    category: 'util',
    options: [
        {
            name: "command",
            description: "Taper le nom de votre commande",
            type: "STRING",
            required: false,
            autocomplete: true
        },
    ],

    runInteraction: async (client, interaction, db) => {
        const prefix = "/";
        const cmdName = interaction.options.getString("command");

        if (!cmdName) {
            const noArgsEmbed = new MessageEmbed()
                .setColor("#6e4aff")
                .addField(
                    "Liste des commandes",
                    `Une liste de toutes les catégories disponibles et leurs commandes.\nPour plus d'informations sur une commande, tapez \`${prefix}help <command>\``
                );

            for (const category of commandFolder) {
                if (category == "admin") continue;
                noArgsEmbed.addField(
                    `+ ${category.replace(/(^\w|\s\w)/g, (firstLetter) =>
                        firstLetter.toUpperCase()
                    )}`,
                    `\`${client.commands
                        .filter((cmd) => cmd.category == category.toLowerCase())
                        .map((cmd) => cmd.name)
                        .join(", ")}\``
                );
            }

            return interaction.reply({ embeds: [noArgsEmbed], ephemeral: false });
        }

        const cmd = client.commands.get(cmdName);
        if (!cmd)
            return interaction.reply({
                content: "cette commande n'existe pas!",
                ephemeral: true,
            });

        const embedCommand = new MessageEmbed()
            .setTitle(`HELP -> ${cmd.name}`)
            .setDescription(`Le bot ne possède pas de prefix, seule les slashs commandes sont disponible. 
            {} = sous-commande(s) disponible(s) | [] = option(s) obligatoire(s) | <> = option(s) optionnel(s)
            Ne pas inclure ces caractères -> {}, [] et <> dans vos commandes.`)
            .addField(`** **`, `\`\`\`makefile
${cmd.ownerOnly ? "/!\\ Pour les admins du bot uniquement /!\\" : ""}
📜 description: ${cmd.description ? cmd.description : contextDescription[`${cmd.name}`]}
📖 Utilisation: ${prefix}${cmd.usage}
📚 Exemples: ${prefix}${cmd.examples.join(` | ${prefix}`)}
⚠️ Permissions de l'utilisateur: ${cmd.userPerms.join(", ")}
⚠️ Permission du bot: ${cmd.botPerms.join(', ')}
            \`\`\``)
        return interaction.reply({
            embeds: [embedCommand],
            ephemeral: false,
        });
    },
    async runAutocomplete(client, interaction) {
        const focusedOption = interaction.options.getFocused(true);
        const choices = client.commands?.map(cmd => cmd.name);
        if (!choices) return;
        const filtered = choices.filter(choice => choice.includes(focusedOption.value.toLowerCase()));
        const filteredLimit = filtered.slice(0, 15);
        await interaction.respond(filteredLimit.map(choice => ({ name: choice, value: choice })));
    }

}