export default ({ data }) => {
  return data.map(({ stu_id, stu_code, stu_name }) => ({
    key: stu_id,
    stu_code,
    stu_name,
    disabled: false,
  }));
};
