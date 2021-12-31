const { bot } = require("../bot");

bot.hears('p', ctx => {
  ctx.reply(ctx.locale['hears_p']);
});
