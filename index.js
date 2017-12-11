const { Token } = require("./config");
const Discord = require("discord.js");
const Commando = require("discord.js-commando");
const bot = new Commando.Client({
    owner: "227238361964871682",
    commandPrefix: "~"
});

bot.on('ready', () => {
    console.log("Locked, And Loaded.");
    console.log(`Serving ${bot.users.size} Users`);
});

bot.registry.registerGroup('main', 'Main Commands');
bot.registry.registerDefaults();
bot.registry.registerCommandsIn(__dirname + "/commands");

bot.login(Token);




