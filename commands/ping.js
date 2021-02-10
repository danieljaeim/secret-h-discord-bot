import helpEmbed from '../embeds/helpEmbed';

module.exports = {
	name: 'help',
	description: 'Help',
	execute(client, message, args) {
		message.channel.send(helpEmbed());
	},
};