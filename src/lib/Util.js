const packageJSON = require('../../package.json');
const sharp = require('sharp');

class Util {
  static version = packageJSON.version;
  static packageInfo = packageJSON;

  /**
   * escape string for telegram markdown formatting
   * @param {String} str string to be scaped
   */
  static escapeMDV2(str) {
    return str.replace(/(_|\*|\[|\]|\(|\)|~|`|>|#|\+|-|=|\||{|}|\.|!)/g, '\\$1');
  }

  static escapeMD(str) {
    return str.replace(/(_|\*|`|\[)/g, '\\$1');
  }

  static async teleImgCompress(buffer) {
    const compressed = sharp(buffer)
      .resize(1280, 960)
      .jpeg({ quality: 70 })
      .toBuffer();
    return compressed;
  }
}

module.exports = Util;
