const client = require('..');
const db = require('../structures/database/database');
const { Collection, Permissions, MessageEmbed } = require('discord.js');
const cooldown = new Collection();
const ms = require("ms");
const config = require('../config.json')

client.on('interactionCreate', async interaction => {

    if (interaction.isCommand() || interaction.isContextMenu()) {
        const cmd = client.commands.get(interaction.commandName);
        if (!cmd) return interaction.reply(`Cette commande n'existe pas!`);

        if (cmd) {
            if (cmd.cooldown) {
                if (cooldown.has(`${cmd.name}${interaction.user.id}`)) return interaction.reply({ content: `${ms(cooldown.get(`${cmd.name}${interaction.user.id}`) - Date.now())}\ de cooldown ! Veuillez patienter.` })

                if (cmd.userPerms || cmd.botPerms) {
                    if (!interaction.member.permissions.has(Permissions.resolve(cmd.userPerms || []))) {
                        const userPerms = new MessageEmbed()
                            .setDescription(`❌ ${interaction.user}, Vous n'avez pas les permissions : \`${cmd.userPerms}\` pour utiliser cette commande !`)
                            .setColor('RED')
                        return interaction.reply({ embeds: [userPerms] })

                    };

                    if (!interaction.guild.members.cache.get(client.user.id).permissions.has(Permissions.resolve(cmd.botPerms || []))) {
                        const botPerms = new MessageEmbed()
                            .setDescription(`❌ ${interaction.user}, Le bot n'a pas les permissions : \`${cmd.botPerms}\` pour utiliser cette commande !`)
                            .setColor('RED')
                        return interaction.reply({ embeds: [botPerms] })
                    }
                }

                if (cmd.ownerOnly) {
                    if (interaction.user.id != config.owner.id)
                        return interaction.reply({
                            content:
                                "La seule personne pouvant taper cette commande est l'owner du bot!",
                            ephemeral: true,
                        });
                }

                cooldown.set(`${cmd.name}${interaction.user.id}`, Date.now() + cmd.cooldown)
                setTimeout(() => {
                    cooldown.delete(`${cmd.name}${interaction.user.id}`)
                }, cmd.cooldown);
            } else {
                if (cmd.userPerms || cmd.botPerms) {
                    if (!interaction.member.permissions.has(Permissions.resolve(cmd.userPerms || []))) {
                        const userPerms = new MessageEmbed()
                            .setDescription(`❌ ${interaction.user}, Vous n'avez pas les permissions : \`${cmd.userPerms}\` pour utiliser cette commande !`)
                            .setColor('RED')
                        return interaction.reply({ embeds: [userPerms] })
                    }

                    if (!interaction.guild.members.cache.get(client.user.id).permissions.has(Permissions.resolve(cmd.botPerms || []))) {
                        const botPerms = new MessageEmbed()
                            .setDescription(`❌ ${interaction.user}, Le bot n'a pas les permissions : \`${cmd.botPerms}\` pour utiliser cette commande !`)
                            .setColor('RED')
                        return interaction.reply({ embeds: [botPerms] })
                    }
                }

                if (cmd.ownerOnly) {
                    if (interaction.user.id != config.owner.id)
                        return interaction.reply({
                            content:
                                "La seule personne pouvant taper cette commande est l'owner du bot!",
                            ephemeral: true,
                        });
                }
            }
        }
        cmd.runInteraction(client, interaction, db)

    } else if (interaction.isAutocomplete()) {
        const cmd = client.commands.get(interaction.commandName);
        if (!cmd) return;
        cmd.runAutocomplete(client, interaction, db);
    }
})