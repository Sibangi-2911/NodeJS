require("dotenv").config();
const {REST, Routes} = require("discord.js");

const commands = [{
  name:"create",
  description: "Creates a new  short URL",
},
];

const rest = new REST({ version: "10" }).setToken(process.env.DISCORD_BOT_TOKEN);

//this function helps to register the commands
(async () => {
  try{
    console.log("Started refreshing the application (/) commands.");

    await rest.put(Routes.applicationCommands('1396517465688899694'), { body: commands});

    console.log("Successfully reloaded the application (/) commands.");
  }
  catch(error){
    console.log(error);
  }
})();