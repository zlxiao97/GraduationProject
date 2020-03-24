export default {
  ImgType: 'BASE64',
  Group: 'test9',
  configObj: {
    quality: {
      minFaceSize: 120,
      blurThreshold: 0.7,
      isCheckQuality: false,
    },
    liveActionArray: [
      0, //眨眨眼
      1, //张张嘴
      // 2,//向右摇头
      // 3,//向左摇头
      // 4,//抬头
      // 5,//低头
      // 6//摇头
    ],
    // "order": true,
    sound: true,
  },
};
