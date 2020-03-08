module.exports = (table, condition = {}) => {
  let conditionSQL = `${Object.keys(condition).reduce(
    (acc, key) => acc + `${key}='${condition[key]}' AND `,
    " "
  )}`;
  conditionSQL = conditionSQL.substring(0, conditionSQL.length - 5);
  `select COUNT(*) from ${table} ${
    Object.keys(condition).length ? "where" : ""
  } ${conditionSQL};`;
};
