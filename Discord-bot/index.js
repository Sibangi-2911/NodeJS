require("dotenv").config();
const {Client, GatewayIntentBits} = require("discord.js");

//create a virtual client so that you can interact with the server and intent means what kind of permission given
const client =  new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent]});

client.on("messageCreate", (message)=>{
  console.log(message.content);
  if(message.author.bot) return;
  message.reply({
    content: "Hi from Bot!!",
  });
});

client.login(
  process.env.DISCORD_BOT_TOKEN
);
