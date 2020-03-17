export default data => {
  var at = 0;
  var ab = 0;
  data.forEach(({ atNum, abNum }) => {
    atNum = +atNum;
    abNum = +abNum;
    at += atNum;
    ab += abNum;
  });
  if (at > 0 || ab > 0) {
    return [
      {
        name: '出勤',
        count: at,
      },
      {
        name: '缺勤',
        count: ab,
      },
    ];
  }
  return [];
};
