const { bot } = require("../bot");
const BigBossGenerator = require("../generator/BigBoss");
const { teleImgCompress } = require("../lib/Util");

bot.command('write', (ctx) => {
  ctx.replyWithHTML(ctx.locale['writejs_prompt'], { disable_web_page_preview: true });
  ctx.userCache.awaitResponse = 'write';
  ctx.toMenu(ctx, true);
});

bot.on('text', async (ctx, next) => {
  const userCache = ctx.userCache;
  if (!userCache.awaitResponse.startsWith('write')) return next();

  ctx.reply(ctx.locale['writejs_wait']);
  let Generator;
  const paper = userCache.paper;
  if (paper == 'big boss') {
    Generator = new BigBossGenerator(userCache);
  } else {
    Generator = new BigBossGenerator(userCache);
  }
  Generator.image = paper;
  try {
    await Generator.loadImage();
    await Generator.write(ctx.message.text);
    // Generator.write(ctx.message.text, 130, 150);
    for (const buff of Generator.buffers) {
      const compressed = await teleImgCompress(buff);
      await ctx.replyWithPhoto({ source: compressed });
    }
  } catch (e) {
    logger.error(e.stack);
  }

  ctx.toMenu(ctx);
  userCache.awaitResponse = '';

  return next();
});
