export default data => {
  return data.reduce((acc, { lesson_name, atNum, abNum }) => {
    const atVal = {
      status: '出勤',
      lesson_name,
      count: atNum,
    };
    const abVal = {
      status: '缺勤',
      lesson_name,
      count: abNum,
    };
    return [...acc, atVal, abVal];
  }, []);
};
