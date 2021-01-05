const Discord = require('discord.js');

/** secret-hitler-img */

module.exports = dmVoteChancellorEmbed = (gamestate, chancellorNominee, player) => {
	let areBothFascists = chancellorNominee.role == "F" && player.role == "F" && chancellorNominee.id !== player.id;
	
	let embed = new Discord.MessageEmbed()
	.setColor('#0099ff')
	.setTitle(`Do you agree?`)
	.setDescription(`${gamestate.president} wants to be president. \n ${chancellorNominee} will be their chancellor.\n You get one vote. Make it count.`)
	.setThumbnail('https://i.imgur.com/1jE7uUZ.jpg') // vote icon here

	if (areBothFascists) {
		embed.addField(`Remember. ${chancellorNominee.username} is also a fascist.`, '😈');
	}

	if (gamestate.board.resetCounters > 0) {
		embed.addField('Reset Counters: ', gamestate.board.resetCounters, true);
	}

	return embed;
	
}
    
    // maybe an indicator of the number of people currently on the game