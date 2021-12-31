const { bot } = require("../bot");
const { userSettingsModel } = require("../lib/schema");

bot.command('reset', async (ctx) => {
  const defaultFont = 'default';
  const defaultPaper = 'big boss';
  const defaultColor = 'black';
  await userSettingsModel.findOneAndUpdate({ userID: ctx.from.id }, {
    font: defaultFont,
    paper: defaultPaper,
  });
  const userCache = ctx.userCache;
  userCache.font = defaultFont;
  userCache.paper = defaultPaper;
  userCache.color = defaultColor;
  userCache.langCode = 'en';
  userCache.awaitResponse = '';
  ctx.reply(ctx.locale['resetjs_successReset']);
  ctx.toMenu(ctx);
});
