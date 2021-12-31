const { bot } = require("../bot");
const { userSettingsModel } = require("../lib/schema");

bot.command('paper', ctx => {
  if (ctx.from_menu) {
    for (let i = 0; i < inline_keyboard.length; i++) {
      for (let j = 0; j < inline_keyboard[i].length; j++) {
        inline_keyboard[i][j].callback_data += 'from_menu';
      }
    }
  }
  ctx.reply(ctx.locale['paperjs_ask'], {
    reply_markup: {
      one_time_keyboard: true,
      inline_keyboard,
    }
  });
});

const inline_keyboard = [];
// const paperList = ['book', 'big boss', 'hvs A4', 'polio']; // upcoming features
const paperList = ['big boss'];

let j = 0;
for (let i = 0; i < paperList.length; i++) {
  const style = paperList[i];
  if (i % 3 === 0) {
    inline_keyboard.push([]);
    if (i !== 0) j++;
  }
  // create inline keyboard
  inline_keyboard[j].push(
    {
      text: style,
      callback_data: style,
    }
  );

  // create bot action
  bot.action(new RegExp(`^${style}`), async (ctx) => {
    try {
      const update = await userSettingsModel.findOneAndUpdate({ userID: ctx.from.id }, {
        paper: style,
      }, { upsert: true, new: true });
      ctx.userCache.paper = update.paper;
      ctx.replyWithHTML(ctx.locale['paperjs_successChangePaper'].formatUnicorn({ new: update.paper }));
    } catch (e) {
      ctx.replyWithHTML(ctx.locale['unexpectedError'].formatUnicorn({ msg: e.message }));
    }
    ctx.deleteMessage();

    ctx.toMenu(ctx);
  });
}
