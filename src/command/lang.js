const { bot } = require("../bot");
const { userSettingsModel } = require("../lib/schema");

bot.command('lang', async (ctx) => {
  let langList = '';
  for (const lang of ctx.availableLocales) {
    langList += `\n- <code>${lang}</code>`;
  }

  ctx.replyWithHTML(ctx.locale['langjs_ask'].formatUnicorn({ langList }));
  ctx.userCache.awaitResponse = 'lang';
  ctx.toMenu(ctx, true);
});

bot.on('text', async (ctx, next) => {
  const userCache = ctx.userCache;
  if (!userCache.awaitResponse.startsWith('lang')) return next();
  const msg = ctx.message.text.trim();

  if (!ctx.availableLocales.some(code => code === msg)) {
    ctx.reply(ctx.locale['langjs_404'].formatUnicorn({ lang: userCache.langCode }));
  } else {
    ctx.replyWithHTML(ctx.locale['langjs_successChangeLang'].formatUnicorn({ newLang: msg }));
    await userSettingsModel.findOneAndUpdate({ userID: ctx.from.id }, {
      langCode: msg,
    }, { upsert: true });
  }

  ctx.toMenu(ctx);
  userCache.awaitResponse = '';

  return next();
});
