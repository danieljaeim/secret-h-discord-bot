const Discord = require('discord.js');

/** secret-hitler-img */

const liberalImg = new Discord.MessageAttachment('./img/liberal_role.jpg', 'liberal_role.jpg');

module.exports = liberalRoleEmbed = (player) => new Discord.MessageEmbed()
	.setColor('#0099ff')
	.setTitle(`Protect us ${player.username}!`)
    .setDescription(`Hitler and his fascists have blended in. \n They're after you.`)
    .attachFiles(['./img/liberal_role.jpg'])
    .setImage('attachment://liberal_role.jpg')
    
    // maybe an indicator of the number of people currently on the game