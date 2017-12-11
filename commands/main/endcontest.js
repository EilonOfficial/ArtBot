const { Command } = require("discord.js-commando");
const mysql = require("mysql");
const path = require("path");
const fs = require("fs");
var con = mysql.createConnection({
    host: "localhost",
    user: "Main",
    password: "Bobber06",
    database: "Discord"
})

class EndContestCommand extends Command {
    constructor(client){
        super(client, {
            name:'endcontest',
            memberName:'endcontest',
            description:'Ends The Current Contest',
            group:'main'
        })
    }

    hasPermission(msg){
        if(msg.channel.type === "text") return msg.member.roles.has(msg.guild.roles.find("name", "Owner").id) || msg.member.id === "227238361964871682";
    }

    async run(message){
        var GoogleSpreadsheet = require('google-spreadsheet');
        var async = require('async');
        var doc = new GoogleSpreadsheet('1eDrfHqTtUE6E3D5X8G8Twjc2R9JaBs_f-YV1KJoeS8c');
        var sheet;
        async.series([
          function setAuth(step) {
            var creds = require('../../google-generated-creds.json'); 
            doc.useServiceAccountAuth(creds, step);
          },
          function getInfoAndWorksheets(step) {
            doc.getInfo(function(err, info) {
              console.log('Loaded doc: '+info.title+' by '+info.author.email);
              sheet = info.worksheets[0];
              console.log('sheet 1: '+sheet.title+' '+sheet.rowCount+'x'+sheet.colCount);
              step();
            });
          },
          function workingWithRows(step) {
            sheet.getRows({
              offset: 1,
              limit: 20,
              orderby: 'col2'
            }, function( err, rows ){
              console.log('Read '+rows.length+' rows'); 
              step();
            });
          },
          function workingWithCells(step) {
            sheet.getCells({
              'min-row': 1,
              'max-row': 30,
              'return-empty': true
            }, function(err, cells) {
              var cell = cells[0];
              console.log('Cell R'+cell.row+'C'+cell.col+' = '+cell.value);
              var numjson = JSON.parse(fs.readFileSync('C:/Users/NewPoof/Desktop/ArtLoungeBot/numjson.json', 'utf8'));
              cells[numjson.num1].value = "----";
              cells[numjson.num2].value = "OVER";
              cells[numjson.num3].value = "----";
              sheet.bulkUpdateCells(cells);
            
      
                var arrayOfObjects = {
                    num1: numjson.num1 + 26,
                    num2: numjson.num2 + 26,
                    num3: numjson.num3 + 26
                }

                var content = JSON.stringify(arrayOfObjects)

                fs.writeFile("C:/Users/NewPoof/Desktop/ArtLoungeBot/numjson.json", content, 'utf8', function (err) {
                    if (err) {
                        return console.log(err);
                    }
                
                    console.log("The file was saved!");
                }); 
                message.reply("I have successfuly ended the current contest.");
              step();
            });
          },
        ], function(err){
            if( err ) {
              console.log('Error: '+err);
            }
        })
    }
}
module.exports = EndContestCommand;