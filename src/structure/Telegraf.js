const { Telegraf } = require("telegraf");

/** @typedef {import('telegraf').Context} Context */

/**
 * @typedef {Object} UserCache
 * @property {string} awaitResponse store the name of method that awaiting response
 * @property {string} paper type of paper
 * @property {string} font font style
 * @property {string} color css color or rgb hex
 * @property {string} langCode language code to use
 */

/**
 * @typedef {Object} CustomCtxProp
 * @property {Object} locale
 * @property {string[]} availableLocales
 * @property {function(Context)} toMenu
 * @property {UserCache} userCache}
 *
 * @typedef {Context & CustomCtxProp} ExtendedContext
 */

module.exports = class ExtendedTelegraf extends Telegraf {
  constructor(token, options) {
    super(token, options);

    /**
     * Session mapping mapped by their user ID
     * @type {Map<Number, UserCache>}
     */
    this.userCache = new Map();

    /**
     * @type {Map<String, function(ExtendedContext)}
     */
    this.cmdFn = new Map();
  }

  /**
   * @param {string | string[]} command
   * @param  {...function(ExtendedContext)} fns
   * @returns {ExtendedTelegraf}
   */
  command(command, ...fns) {
    super.command(command, ...fns);
    // register command function
    this.cmdFn.set(command, ...fns);
    return this;
  }

  /**
   * @param {...function(ExtendedContext)} fns
   * @returns {ExtendedTelegraf}
   */
  settings(...fns) {
    super.settings(...fns);
    this.cmdFn.set('settings', ...fns);
    return this;
  }

  /**
   * @param  {...function(ExtendedContext)} fns
   */
  help(...fns) {
    super.help(...fns);
    this.cmdFn.set('help', ...fns);
    return this;
  }

};
