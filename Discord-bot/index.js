require("dotenv").config();
const {Client, GatewayIntentBits} = require("discord.js");

//create a virtual client so that you can interact with the server and intent means what kind of permission given
const client =  new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent]});

client.on("messageCreate", (message)=>{
  console.log(message.content);
  if(message.author.bot) return;
  if(message.content.startsWith("create")){
    const url = message.content.split("create")[1];
    return message.reply({
      content: "Generating Short ID for URL " + url,
    })
  }
  message.reply({
    content: "Hi from Bot!!",
  });
});

client.on("interactionCreate", interaction=>{
  console.log(interaction);
  interaction.reply("Pong!!!");
})

client.login(
  process.env.DISCORD_BOT_TOKEN
);
