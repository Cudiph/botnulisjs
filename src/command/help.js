const { bot } = require('../bot');

bot.help((ctx) => {
  ctx.reply(ctx.locale['helpjs_usage']);
});
