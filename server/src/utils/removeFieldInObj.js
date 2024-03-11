export const removeField = (Object, itemRemove) => {
  const newObj = Object;
  for (let index = 0; index < itemRemove.length; index++) {
    delete Object[itemRemove[index]];
  }
  return newObj;
};
