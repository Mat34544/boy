
const botconfig = require("./botconfig.json");
const Discord = require ("discord.js");
const bot = new Discord.Client({disableEveryone: true});



bot.on("ready", async () => {
  console.log(`${bot.user.username} en Linea!`);
  bot.user.setGame("M Community");
});

bot.on("message", async message => {
  if(message.author.bot) return;
  if(message.channel.type === "dm") return;

  let prefix = botconfig.prefix
  let messageArray = message.content.split(" ");
  let cmd = messageArray[0];
  let args = messageArray.slice(1);




//REPORTAR USUARIO -REPORT


if(cmd === `${prefix}reportar`){

  let rUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
  if (!rUser) return message.channel.send("No se pudo encontrar el usuario");
  let reason = args.join(" ").slice(22);

  let reportEmbed = new Discord.RichEmbed()
    .setDescription("Reporte")
    .setColor("#ff8c00")
    .addField("Usuario Reportado", `${rUser} con ID: ${rUser.id}`)
    .addField("Reportado por", `${message.author} con ID: ${message.author.id}`)
    .addField("Canal", message.channel)
    .addField("Hora", message.createdAt)
    .addField("Razón", reason);

    let reporteschannel = message.guild.channels.find(`name`, "reportes");
    if(!reporteschannel) return message.channel.send("No se encontro canal de reportes")



    message.delete().catch(O_o=>{});
    reporteschannel.send(reportEmbed);
    return;

}










//INFORMACION SERVIDOR -INFOSERVER

if(cmd === `${prefix}infoserver`){
  let sicon = message.guild.iconURL;
  let serverembed = new Discord.RichEmbed()
  .setDescription("Información Server")
  .setColor("#00d0ff")
  .setThumbnail(sicon)
  .addField("Nombre", message.guild.name)
  .addField("Creado En", message.guild.createdAt)
  .addField("Te uniste", message.member.joinedAt)
  .addField("Miembros en total", message.guild.memberCount);

  return message.channel.send(serverembed);
}





//INFORMACION BOT -INFOBOT

if(cmd === `${prefix}infobot`){

  let bicon = bot.user.displayAvatarURL;
  let botembed = new Discord.RichEmbed()
 .setDescription("Información M Community Bot")
 .setColor("#00d0ff")
 .setThumbnail(bicon)
 .addField("Nombre", bot.user.username)
 .addField("Creado En", bot.user.createdAt);


  return message.channel.send(botembed);

  }
});


















bot.login(botconfig.token);
