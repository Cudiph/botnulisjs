const packageJSON = require('../../package.json');

class Util {
  static version = packageJSON.version;
  static packageInfo = packageJSON;

  /**
   * escape string for telegram markdown formatting
   * @param {String} str string to be scaped
   */
  static escapeMDV2(str) {
    return str.replaceAll(/(_|\*|\[|\]|\(|\)|~|`|>|#|\+|-|=|\||{|}|\.|!)/g, '\\$1');
  }

  static escapeMD(str) {
    return str.replaceAll(/(_|\*|`|\[)/g, '\\$1');
  }
}

module.exports = Util;
