/** Dependencies */
const Discord = require('discord.js');

/** Embeds */
const exampleEmbed = require('../embeds/startEmbed');

module.exports = {
  name: "start",
  description: "initializes the secret hitler instance",
  execute(client, message, args) {
    let hostName = message.author.username;
    hostName = hostName.split(' ').join('-');
    let hostChannelName = `${hostName}-secret-hitler-game`;

    /** Create the text-channel that will host the game. If the text channel already exists, do not create it. */
    console.log('hostChannel: ', hostChannelName)
    if (
      !message.guild.channels.cache.some((c) => {
        c.name.trim()
        return c.name == hostChannelName;
      })
    ) {
      message.guild.channels
        .create(hostChannelName, {
          type: "text",
        })
        .then((channel) => {
          console.log("created a new room called " + channel.name);
        });
    }

    message.channel.send(
      exampleEmbed
    );
    // Here we will initialize a new game of secret hitler.

    /**
     * 1.
     */
  },
};
