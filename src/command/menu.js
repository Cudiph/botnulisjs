const { bot } = require("../bot");

const suffix = '_from_menu';

bot.command('menu', (ctx) => {
  ctx.reply('Welcome to interactive menu\nWhat do you want to do?', {
    reply_markup: {
      inline_keyboard,
    }
  });
});

const inline_keyboard = [
  [
    {
      text: 'set paper',
      callback_data: 'paper' + suffix,
    },
    {
      text: 'set font',
      callback_data: 'font' + suffix,
    },
    {
      text: 'set color',
      callback_data: 'color' + suffix,
    },
    {
      text: 'set language',
      callback_data: 'lang' + suffix,
    }
  ],
  [
    {
      text: 'reset configuration',
      callback_data: 'reset' + suffix,
    },
    {
      text: 'show settings (config)',
      callback_data: 'settings' + suffix,
    },
    {
      text: 'show help',
      callback_data: 'help' + suffix,
    },
  ],
  [
    {
      text: 'write from text',
      callback_data: 'write' + suffix,
    }
  ],
  [
    {
      text: 'Close',
      callback_data: 'close_menu',
    }
  ]
];

for (let i = 0; i < inline_keyboard.length - 1; i++) {
  for (const j of inline_keyboard[i]) {
    bot.action(j.callback_data, (ctx) => {
      ctx.from_menu = true;
      ctx.deleteMessage().catch(e => e);
      bot.cmdFn.get(j.callback_data.replace(suffix, ''))(ctx);
    });
  }
}

bot.action('close_menu', (ctx) => {
  ctx.deleteMessage().catch(e => e);
});
