/** Dependencies */
const Discord = require("discord.js");

/** Embeds */
const createEmbed = require("../embeds/startEmbed");

module.exports = {
  name: "start",
  description: "initializes the secret hitler instance",
  execute(client, message, args) {
    let hostName = message.author.username;
    hostName = hostName.split(" ").join("-");
    let hostChannelName = `${hostName}-sh`;
    let hostChannel; // this is the channel where the game is hosted

    /** Create the text-channel that will host the game. If the text channel already exists, do not create it. */
    if (
      !message.guild.channels.cache.some((c) => {
        c.name.trim();
        return c.name == hostChannelName;
      })
    ) {
      message.guild.channels
        .create(hostChannelName, {
          type: "text",
        })
        .then((channel) => {
          console.log("created a new room called " + channel.name);
          hostChannel = channel;
        });
    } else {
		hostChannel = message.guild.channels.cache.find(c => c.name == hostChannelName)
    }

    message.channel.send(createEmbed(hostName, hostChannel));
    // Here we will initialize a new game of secret hitler.

    /**
     * 1.
     */
  },
};
