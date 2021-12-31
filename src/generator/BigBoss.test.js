const Canvas = require('canvas');
const fs = require('fs');
const BigBoss = require('./BigBoss');

class BigBossTest extends BigBoss {
  constructor() {
    super({ font: 'default', color: '' });
  }

  // for experimenting purpose
  async test() {
    const path = `${__dirname}/../static/big boss.jpg`;
    const canvas = Canvas.createCanvas(1440, 1080);
    const ctx = canvas.getContext('2d');
    const img = await Canvas.loadImage(path);
    ctx.drawImage(img, 0, 0, img.naturalWidth, img.naturalHeight, 0, 0, canvas.width, canvas.height);
    const startx = 124;
    const starty = 148;

    // rotate 359 degrees or -1 degrees?
    ctx.translate(startx, starty);
    ctx.rotate(-1 * Math.PI / 180);
    ctx.translate(-startx, -starty);
    ctx.font = '24px default';
    const text = `The Quick Brown fox jump over the lazy dogs 123459`;
    const text2 = `ahslvbgo ewhisgfhb aewgb hoawehgb oawhb egh jweghb`;
    console.log(text2);
    ctx.fillText(text, startx, starty);

    // reset transform to normal
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    const buffer = canvas.toBuffer();
    console.log(Buffer.byteLength(buffer));
    fs.writeFileSync(`${__dirname}/bigbosstest.png`, buffer);

  }
}


const test = new BigBossTest();
test.test();
