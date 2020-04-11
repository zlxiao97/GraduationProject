export default params =>
  Object.keys(params).reduce((result, key) => {
    if (!result) return result;
    return Boolean(params[key]);
  }, true);
