var { NativeModules } = require('react-native');

/**
 * @text, 分享内容
 * @img, 图片地址，可以为链接，本地地址以及res图片地址
 * @url, 为分享链接，可以为空
 * @title, 为分享链接的标题
 *   */
function open(text, img, url,title, callback) {
  NativeModules.UMShareModule.shareboard(text, img, url, title, [2,3,0,1,4,32], callback);
}

module.exports = { open };