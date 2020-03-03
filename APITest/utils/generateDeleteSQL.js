module.exports = (table, condition = {}) => {
  if (Object.keys(condition).length > 0) {
    let conditionSQL = `${Object.keys(condition).reduce(
      (acc, key) => acc + `${key}='${condition[key]}' AND `,
      " "
    )}`;
    conditionSQL = conditionSQL.substring(0, conditionSQL.length - 5);
    return `DELETE FROM ${table} WHERE ${conditionSQL};`;
  }
  return `DELETE FROM ${table};`;
};
