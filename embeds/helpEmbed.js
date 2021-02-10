const Discord = require('discord.js');

module.exports = createHelpEmbed = () => new Discord.MessageEmbed()
    .setColor('#0099ff')
    .setTitle("What is Secret Hitler?")
    .setDescription("Secret Hitler is a dramatic game of intrigue and betrayal. \n\n Players are secretly divided into two teams - liberals and fascists - with one player becoming Hitler, leader of the Fascists.\n\n" +
        "Each round, players elect a President and a Chancellor who will work together to enact policies from a random deck. To win the game, both parties try to enact enough policies to " +
        "fill their side of the board. \n\n" +
        
        "Liberals work to enact liberal policies, eliminate fascists, and avoid accidentally electing Hitler as President **oppsie-doopsie**. \n\n" +
        "Fascists assist Hitler in enacting fascist policies, stirring unrest, spreading misinformation, and eliminating those who oppose their reign.")
    .addField(
        "Commands", "**@sh start**: creates a text-channel based on the host and begins a game."
    )
    .addFields(
        [
            {name: "Rules in 4 Minutes", value: "[Rules Tutorial by 'The Rules Girl'](https://youtu.be/mbGXIDYdtas)", inline: true},
            {name: "Comprehensive Rules in PDF", value: "[Rules in PDF](https://discordapp.com/oauth2/authorize?client_id=439778986050977792&scope=bot&permissions=8)", inline: true}
        ]
    )
    .setFooter(
        "This bot is still in development. Avoid deleting Messages or Embeds directly from the bot."
    )