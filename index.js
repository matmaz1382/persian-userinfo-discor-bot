// ============== Consts ==============
const Discord = require('discord.js');
const moment = require('moment');
const { prefix, token } = require('./config.json');
const client = new Discord.Client();

// ============ Ready log ============
  client.on ("ready", () => {
    
    console.log('The Bot Is Ready!');
    console.log(`Logged In As ${client.user.username}#${client.user.discriminator}`);
    client.user.setPresence({
      status: 'dnd', // Can Be ONLINE, DND, IDLE, INVISBLE
      activity: {
          name: `${prefix}help`,
          type: 'LISTENING', // Can Be WHATCHING, LISTENING
      }
  })
  }); 

  // ============ USER =============
  client.on("message", m => {
    if (m.content.startsWith(`${prefix}user`)) {
        let user = (m.mentions.users.first()) || m.author;
        let member = m.mentions.members.first() || m.member;
    
    
        let userinfo = {};
        userinfo.avatar = user.displayAvatarURL()
        userinfo.name = user.username;
        userinfo.discrim = `#${user.discriminator}`;
        userinfo.id = user.id;
        userinfo.status = user.presence.status;
        userinfo.registered = moment(user.createdAt);
        userinfo.joined = moment(user.joinedAt);
    
        const userdate = new Discord.MessageEmbed()
        .setColor('#cad347')
        .setAuthor(user.tag, userinfo.avatar)
        .setThumbnail(userinfo.avatar)
        .addField(`یوزرنیم`, userinfo.name, true)
        .addField(`تگ`, userinfo.discrim, true)
        .addField(`وضعیت`, userinfo.status, true)
        .addField(`ایدی`, userinfo.id)
        .addField(`ساخت شده در`, userinfo.registered)
        .addField(`وارد سرور شد در`, userinfo.joined)
        .setFooter(`${m.author.username} درخواست شده توسط`);
        
        return m.channel.send(userdate);
    }
    });  
  // ============ SERVER ===========
  client.on("message", message => {

    const server = new Discord.MessageEmbed()
      .setColor('#cad347')
      .setAuthor(`${message.guild.name}`)
      .addFields(    
            { name: 'اسم سرور', value: `${message.guild.name}`, inline: true },
            { name: 'ایدی سرور', value: `${message.guild.id}`, inline: true },
            { name: 'صاحب سرور', value: `${message.guild.owner}`, inline: true },
            { name: 'لول تایید مورد نیاز', value: `${message.guild.verificationLevel}`, inline: true },
            { name: 'موقعیت سرور', value: `${message.guild.region}`, inline: true },
            { name: 'مجموع اعضا', value: `${message.guild.memberCount}`, inline: true },
            )
      .setTimestamp()
      .setFooter(`${message.author.username} درخواست شده توسط`);

        if (message.content === `${prefix}server`) {
            message.channel.send(server);
        }     
    });

    // ============ HELP =============
    client.on("message", message => {

      const help = new Discord.MessageEmbed()
          .setColor('#cad347')
        .setTitle(`${message.guild.name} Server Commands`)
        .setThumbnail('https://i.imgur.com/Mvldlmp.png')
        .addFields(
          { name: `${prefix}server`, value: '`نمایش اطلاعات سرور`', inline: true },
          { name: `${prefix}user`, value: '`نمایش اطلاعات کاربر`', inline: true  },
          { name: `${prefix}avatar`, value: '`نمایش پروفایل`', inline: true  },
    )
    .setTimestamp()
    .setFooter(`${message.author.username} درخواست شده توسط`);

        if (message.content === `${prefix}help`) {
            message.channel.send(help);
        }     
    });

    // ============ AVATAR =============
    client.on('message', message => {

      if (message.content === `${prefix}avatar`) {
  
          let embed = new Discord.MessageEmbed();
          if(!message.mentions.users.first()) {
              embed.setTitle('آواتار شما');
              embed.setDescription(`: لینک ها \n[png](${message.author.displayAvatarURL({format: "png", size: 2048})}) | [jpg](${message.author.displayAvatarURL({format: "jpg", size: 2048})}) | [gif](${message.author.displayAvatarURL({format: "gif", size: 2048, dynamic: true})}) | [webp](${message.author.displayAvatarURL({format: "webp", size: 2048})})`);
              embed.setColor('#cad347');
              embed.setTimestamp();
              embed.setFooter(`${message.author.username} درخواست شده توسط`);
              embed.setImage(message.author.displayAvatarURL({size: 2048, dynamic: true}));
              message.channel.send(embed);

          }
        }
  });

// ============ End ============   
   
client.login(token);
