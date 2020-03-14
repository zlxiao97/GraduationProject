// singleton for each page
const context = {
  // last search result
  last: {
    params: null,
    data: null,
  },
};

const setLast = (params, data) => {
  context.last = {
    params,
    data,
  };
};

let filterArrayByKeyword = null;

const containInString = (keywords, str) => str.includes(keywords);

const isString = item => typeof item === 'string';

const containInObject = (keywords, obj, filter) =>
  Object.keys(obj).some(key => {
    const itemToCheck = obj[key];
    if (itemToCheck && !filter.includes(key)) {
      if (isString(itemToCheck)) {
        return containInString(keywords, itemToCheck);
      }
      if (Array.isArray(itemToCheck)) {
        return filterArrayByKeyword(keywords, itemToCheck, filter).length > 0;
      }
    }
    return false;
  });

filterArrayByKeyword = (keywords, array, filter) =>
  array.filter(item => containInObject(keywords, item, filter));

const searchInLast = (keywords, data, filter) => {
  const { data: innerData } = data;
  if (data) {
    return {
      ...data,
      data: filterArrayByKeyword(keywords, innerData, filter),
    };
  }
  return null;
};

/*
关键字搜索的约定:
  1. 关键字 params 字段名字是 keywords
  2. 当进行关键字搜索时 该字段必须不为空
  3. 当进行其它字段搜索时 关键字字段被设置为空
*/
const isKeywordsSearch = params => params.keywords && params.keywords.trim().length > 0;

const searchByKeywords = (params, filter) => {
  const { keywords } = params;
  if (isKeywordsSearch(params)) {
    return searchInLast(keywords.trim(), context.last.data, filter);
  }
  return params;
};

const isNonKeywordsSearchReturned = data => {
  if (data.keywords === '') {
    return true;
  }
  return false
};

export const genAsyncSearch = (asyncQueryFunc, filter = []) => async params => {
  if (!Array.isArray(filter) && typeof filter === 'string') {
    filter = [filter];
  }
  let data = searchByKeywords(params, filter);
  if (isNonKeywordsSearchReturned(data)) {
    data = await asyncQueryFunc(params);
    setLast(params, data);
  }
  return data;
};
