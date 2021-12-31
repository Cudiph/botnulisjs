const ExtendedTelegraf = require('./structure/Telegraf');
const winston = require("winston");
const fs = require('fs');
const mongoose = require('mongoose');
const { userSettingsModel } = require('./lib/schema');
const { stripIndents } = require('common-tags');
const { escapeMDV2 } = require('./lib/Util');
const I18n = require('./lib/i18n');
require('dotenv').config();

const transports = [
  new winston.transports.File({ filename: `${__dirname}/logs` }),
];

if (process.env.NODE_ENV !== 'production') {
  // don't use console in production cuz it's halt the program
  transports.push(new winston.transports.Console());
}

// stack overflow's formatUnicorn
String.prototype.formatUnicorn = function() {
  let e = this.toString();
  if (!arguments.length) return e;
  const t = typeof arguments[0],
    n = t === 'string' || t === 'number' ? Array.prototype.slice.call(arguments) : arguments[0];
  for (const o in n) e = e.replace(new RegExp('\\{' + o + '\\}', 'gi'), n[o]);
  return e;
};

// add winston logger
global.logger = winston.createLogger({
  transports,
  format: winston.format.printf(log => `[${new Date().toISOString()}]: [${log.level.toUpperCase()}] - ${log.message}`),
  exitOnError: false,
});

const bot = new ExtendedTelegraf(process.env.TOKEN);
bot.use(async (ctx, next) => {

  // fetch value from database or set default value
  if (!bot.userCache.has(ctx.from.id)) {
    const q = await userSettingsModel.findOne({ userID: ctx.from.id });
    bot.userCache.set(ctx.from.id, {
      awaitResponse: '',
      font: q?.font || 'default',
      paper: q?.paper || 'big boss',
      color: q?.color || 'black',
      langCode: q?.langCode || 'en',
    });
  }

  ctx.userCache = bot.userCache.get(ctx.from.id);

  // easier access to get back to interactive menu
  ctx.toMenu = (appCtx, waitingUserInput = false) => {
    const suffix = 'from_menu';
    if (appCtx.callbackQuery?.data.endsWith(suffix)) {
      appCtx.userCache.awaitResponse += suffix;
      if (!waitingUserInput) bot.cmdFn.get('menu')(appCtx);
    } else if (ctx.userCache.awaitResponse.endsWith(suffix)) {
      bot.cmdFn.get('menu')(appCtx);
    }
  };
  return next();
});

const i18n = new I18n(bot);
i18n.loadLocales(`${__dirname}/locales`);
bot.use(i18n.middleware());
module.exports.bot = bot;

// load separate method/event/commands
const cmdsFolder = fs.readdirSync(`${__dirname}/command`).filter(file => file.endsWith('.js'));
for (const file of cmdsFolder) {
  require(`./command/${file}`);
}

// log, tell user, and swallow error
bot.catch(async (e, ctx) => {
  logger.error(e.stack);
  ctx.replyWithMarkdownV2(stripIndents`
    An error occured
    Error message\\: \`${escapeMDV2(e.message)}\`
    You can report this error to the owner of the bot
  `);
});

// eslint-disable-next-line no-console
bot.launch().then(() => console.log('BOT READY!'));

process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));

// connect to mongodb database
mongoose.connect(process.env.MONGO_URI);
