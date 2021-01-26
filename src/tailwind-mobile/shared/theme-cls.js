import { cls } from './cls';

const themeClasses = (classesObj, theme, state) => {
  if (typeof classesObj === 'string') return classesObj;
  const args = [classesObj.initial, classesObj[theme]];
  if (state && classesObj[state]) {
    if (typeof classesObj[state] === 'string') args.push(classesObj[state]);
    else {
      args.push(classesObj[state].initial, classesObj[state][theme]);
    }
  }
  return cls(...args);
};

export const themeCls = (theme) => {
  return (classesObj, state) => themeClasses(classesObj, theme, state);
};
