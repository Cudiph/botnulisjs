const { stripIndents } = require("common-tags");
const { oneLine } = require("common-tags/lib");

module.exports = {
  colorjs_ask: stripIndents`
    What color do you want to use?
    Color can either use the color name or using RGB hex value
    for reference: [Color Value MDN Web Docs](https://developer.mozilla.org/en-US/docs/Web/CSS/color_value)
  `,
  fontjs_ask: 'choose font style',
  fontjs_successChangeFont: `Succesfully change font style to <b>{new}</b>`,
  hears_p: `What's up?`,
  helpjs_usage: stripIndents`
    General Commands:
    /start - show greetings and information
    /menu - open up interactive menu
    /help - show this message
    
    Configuration Commands:
    /color - change ink color
    /font - set font style
    /lang - set interface language
    /paper - choose paper style
    /reset - reset all configuration to default value
    /settings - show your current configuration

    Action Commands:
    /write - generate a picture based on given text
  `,
  langjs_ask: 'Choose your language by typing: {langList}',
  langjs_404: 'Language not found, keep current language ({lang})',
  langjs_successChangeLang: 'Change language interface to <b>{newLang}</b>',
  paperjs_ask: 'choose paper style',
  paperjs_successChangePaper: `Succesfully change paper style to <b>{new}</b>`,
  resetjs_successReset: `Configuration reset successfully`,
  settingsjs_config: stripIndents`
    Current configuration:

    Paper: *{paper}*
    Font: *{font}*
    Color: *{color}*
    Language: *{langCode}*
  `,
  startjs_greet: stripIndents`
    Welcome to our bot
    You can use /help for more information about bot usage
    /menu to open interactive menu

    Info:
    Version = v{version}
    License = {license} License
    Author = {author}
    Project Homepage = <a href="{homepage}">Github</a>
  `,
  writejs_prompt: oneLine`Send me text to generate image.
    For advanced usage see <a href="https://github.com/Cudiph/botnulisjs/tree/main/sample">sample</a>
  `,
  writejs_wait: 'Please wait while we processing image...',
  unexpectedError: stripIndents`
    Unexpected error: <code>{msg}</code>
  `,
};
