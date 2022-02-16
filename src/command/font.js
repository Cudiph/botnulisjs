const { bot } = require("../bot");
const { userSettingsModel } = require("../lib/schema");

bot.command('font', ctx => {
  if (ctx.from_menu) {
    for (let i = 0; i < inline_keyboard.length; i++) {
      for (let j = 0; j < inline_keyboard[i].length; j++) {
        inline_keyboard[i][j].callback_data += 'from_menu';
      }
    }
  }
  ctx.reply(ctx.locale['fontjs_ask'], {
    reply_markup: {
      inline_keyboard,
    }
  });
});

const inline_keyboard = [];
const fontList = ['default', 'ugly1', 'ugly2', 'ugly3', 'curly', 'neat1', 'neat2'];
let counter = 0;
for (let i = 0; i < fontList.length; i++) {
  const font = fontList[i];
  if (i % 3 === 0) {
    inline_keyboard.push([]);
    if (i !== 0) counter++;
  }
  // create inline keyboard
  inline_keyboard[counter].push(
    {
      text: font,
      callback_data: font,
    }
  );

  // create bot action
  bot.action(new RegExp(`^${font}`), async (ctx) => {
    try {
      const update = await userSettingsModel.findOneAndUpdate({ userID: ctx.from.id }, {
        font,
      }, { upsert: true, new: true });
      ctx.userCache.font = update.font;
      ctx.replyWithHTML(ctx.locale['fontjs_successChangeFont'].formatUnicorn({ new: update.font }));
    } catch (e) {
      ctx.replyWithHTML(ctx.locale['unexpectedError'].formatUnicorn({ msg: e.message }));
    }
    ctx.deleteMessage().catch(e => e);

    ctx.toMenu(ctx);
  });
}
