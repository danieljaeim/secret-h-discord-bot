module.exports = {
  name: "start",
  description: "initializes the secret hitler instance",
  execute(client, message, args) {
        const hostName = message.author.username;
        message.guild.channels.create(`${hostName}'s-secret-hitler-game`, {
                type: 'text'
        })
        .then(channel => {
                console.log(channel.name)
        })
        message.channel.send(`${hostName} has started a Secret Hitler game. Join the new text-channel made by ${hostName}!`
    );
    // Here we will initialize a new game of secret hitler.

    /**
     * 1.
     */
  },
};
