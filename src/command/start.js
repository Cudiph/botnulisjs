const { bot } = require('../bot');
const { version, packageInfo } = require('../lib/Util');

bot.start(ctx => {
  ctx.replyWithHTML(ctx.locale['startjs_greet'].formatUnicorn({ version, ...packageInfo }), {
    disable_web_page_preview: true,
  });
});
