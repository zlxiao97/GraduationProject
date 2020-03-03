module.exports = (table, obj = {}) => {
  if (Object.keys(obj).length > 0) {
    const columns = Object.keys(obj).join(",");
    const values = Object.values(obj)
      .map(val => `'${val}'`)
      .join(",");
    return `INSERT INTO ${table} (${columns}) VALUES (${values});`;
  }
  return "";
};
