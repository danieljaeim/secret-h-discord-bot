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
    if (!message.guild.channels.cache.some((c) => c.name == hostChannelName)) {
      message.guild.channels.create(hostChannelName, {
        type: "text",
	  })
	  .then(channel => {
		console.log("created a new room called " + channel);
		hostChannel = channel;
		message.channel.send(createEmbed(hostName, hostChannel));
	  })
    } else {
      hostChannel = message.guild.channels.cache.find(
        (c) => c.name == hostChannelName
	  );
	  message.channel.send(createEmbed(hostName, hostChannel));
	}
	// Here we will initialize a new game of secret hitler.

    /**
     * 1. Send an embed in the channel that we just made.
     * 2. People can enter the text channel and type @sh.join to enter the game's queue
     * 3. Once enough people are ready, the host types @sh.ready
     * 4. Bot PM'S them their roles, and they begin the game.
     */
  },
};
