const { Command } = require("discord.js-commando");
const mysql = require("mysql");
var con = mysql.createConnection({
    host: "localhost",
    user: "Main",
    password: "Bobber06",
    database: "Discord"
})

class ChooseWinnerCommand extends Command {
    constructor(client){
        super(client, {
            name:'choosewinner',
            memberName:'choosewinner',
            description:'Chooses A Winner For The Current Art Event.',
            group:'main',
            args: [
                {
                    key:'user',
                    prompt:'Please Provide A User Bellow.',
                    type:'user'
                },
                {
                    key:'Tier',
                    prompt:'Which Tier? H/M/L (High, Mid, Low)',
                    type:'string'
                }
            ]
        })
    }

    hasPermission(msg){
        if(msg.channel.type === "text") return msg.member.roles.has(msg.guild.roles.find("name", "Owner").id) || msg.member.id === "227238361964871682";
    }

    async run(message, args){
        const { user, Tier } = args;
        con.query(`SELECT * FROM artsubs WHERE AuthorID="${user.id}"`, function(error, row, fields){
            if(!row[0]) message.reply("This User Has Not Submitted An Art Piece.")
            else {
                var TierVar;
                if(Tier === "H" || Tier === "h") var TierVar = "High"
                else if(Tier === "M" || Tier === "m") TierVar = "Middle"
                else if(Tier === "L" || Tier === "l") TierVar = "Low"
                message.guild.channels.find("name", "announcements").send(`${user} Has Won The ${TierVar} Tier Contest!`)
            }
        });
    }

}
module.exports = ChooseWinnerCommand;