export const translation = (title) => {
  let transliteTitle = '';

  if (title === 'coll') {
    transliteTitle = 'Созвон';
  }

  if (title === 'meeting') {
    transliteTitle = 'Встреча';
  }

  if (title === 'presentation') {
    transliteTitle = 'Презентация проекта';
  }
  return transliteTitle;
};
