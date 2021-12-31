const fs = require('fs');

// minimal i18n
module.exports = class I18n {
  /**
   * @param {import('../structure/Telegraf')} botInstance instance of Telegraf Class
   * @param {Object} config configuration
   * @param {string} defaultLanguage default lang
   */
  constructor(botInstance, config = {}) {
    this.config = {
      defaultLanguage: 'en',
      ...config,
    };
    this.botInstance = botInstance;
    this.locales = new Map();
    this.localeList = [];

    if (this.config.LocaleDirectory) {
      this.loadLocales(this.config.LocaleDirectory);
    }
  }

  loadLocales(dir) {
    const localeFiles = fs.readdirSync(dir).filter(name => name.endsWith('.js'));
    for (const locale of localeFiles) {
      const localeObject = require(`${dir}/${locale}`);
      const langCode = locale.slice(0, -3);
      this.locales.set(langCode, localeObject);
      this.localeList.push(langCode);
    }
  }

  middleware() {
    return (ctx, next) => {
      ctx.locale = this.locales.get(this.botInstance.userCache.get(ctx.from.id).langCode);
      ctx.availableLocales = this.localeList;

      return next();
    };
  }
};
