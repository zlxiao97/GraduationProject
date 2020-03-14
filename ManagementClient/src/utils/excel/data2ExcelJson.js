import moment from 'moment';

export default (data, colums) => {
  const configMap = colums.reduce((acc, val) => {
    const { dataIndex } = val;
    return {
      ...acc,
      [dataIndex]: {
        ...val,
      },
    };
  }, {});
  const excelJson = data.map(obj => {
    return Object.keys(obj).reduce((acc, key) => {
      if (!configMap.hasOwnProperty(key)) return acc;
      const { title, valueEnum, valueType } = configMap[key];
      let value = obj[key];
      if (valueType === 'dateTime') {
        value = moment(value).format('YYYY-MM-DD HH:mm:ss');
      }
      if (valueEnum !== undefined) {
        value = valueEnum[value].text;
      }
      return {
        ...acc,
        [title]: value,
      };
    }, {});
  });
  return [...excelJson];
};
