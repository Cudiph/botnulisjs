const { bot } = require('../bot');
const { userSettingsModel } = require('../lib/schema');

bot.command('color', (ctx) => {
  const askMsg = ctx.locale['colorjs_ask'];
  ctx.replyWithMarkdown(askMsg, { disable_web_page_preview: true });
  ctx.userCache.awaitResponse = 'color';
  ctx.toMenu(ctx, true);
});

bot.on('text', async (ctx, next) => {
  const userCache = ctx.userCache;
  if (!userCache.awaitResponse.startsWith('color')) return next();

  const text = ctx.message.text.trim();
  userCache.color = text;
  await userSettingsModel.findOneAndUpdate({ userID: ctx.from.id }, {
    color: text
  }, { upsert: true }).catch(e => e);
  ctx.reply(`change ink color to ${text}`);

  ctx.toMenu(ctx);
  userCache.awaitResponse = '';

  return next();
});
