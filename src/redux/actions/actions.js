export const updateJsonData = (data) => {
  return {
    type: 'UPDATE_JSON_DATA',
    payload: data,
  };
};

export const updateCategoryItems = (data) => {
  return {
    type: 'UPDATE_CATEGORY_ITEMS',
    payload: data,
  }
}