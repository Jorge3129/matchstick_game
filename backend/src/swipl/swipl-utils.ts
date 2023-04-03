import { SwiplList } from './swipl-list.interface';

export const listToArray = <T = any>(list: SwiplList<T>): T[] => {
  if (list === '[]') {
    return [];
  }

  return [list.head].concat(listToArray(list.tail));
};
