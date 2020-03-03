module.exports = (table, obj = {}, condition = {}) => {
  if (Object.keys(obj).length > 0) {
    let setSQL = Object.keys(obj).reduce((acc, k) => {
      return acc + `${k} = '${obj[k]}', `;
    }, " ");
    setSQL = setSQL.substring(0, setSQL.length - 2);
    let conditionSQL = `${Object.keys(condition).reduce(
      (acc, key) => acc + `${key}='${condition[key]}' AND `,
      " "
    )}`;
    conditionSQL = conditionSQL.substring(0, conditionSQL.length - 5);
    return `UPDATE ${table} SET${setSQL} WHERE${conditionSQL};`;
  }
  return "";
};
