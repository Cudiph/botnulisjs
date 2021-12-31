const { bot } = require("../bot");

bot.settings(async (ctx) => {
  // const q = await userSettingsModel.findOne({ userID: ctx.from.id });
  const userCache = ctx.userCache;

  await ctx.replyWithMarkdown(ctx.locale['settingsjs_config'].formatUnicorn({ ...userCache }));
  ctx.toMenu(ctx);
});
