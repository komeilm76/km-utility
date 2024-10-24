import _ from 'lodash';

const _length = <ELEM extends any>(list: ELEM[]) => {
  return list.length;
};
const firstIndex = <ELEM extends any>(list: ELEM[]) => {
  let isEmpty = _.isEmpty(list);
  if (isEmpty == true) {
    return undefined;
  } else {
    return 0;
  }
};
const lastIndex = <ELEM extends any>(list: ELEM[]) => {
  let lengthOfArray = _length(list);
  return lengthOfArray - 1;
};
const firstElement = <ELEM extends any>(list: ELEM[]) => {
  return _.first(list);
};
const lastElement = <ELEM extends any>(list: ELEM[]) => {
  return _.last(list);
};
const selectElement = <ELEM extends any>(list: ELEM[], indexOfElement: number) => {
  // @ts-ignore
  let output = list.find((item, index) => {
    return index == indexOfElement;
  });
  return output;
};
const selectElements = <ELEM extends any>(
  list: ELEM[],
  indexesOfElements: number[],
  strict: boolean = false
) => {
  let output = indexesOfElements.map((item) => {
    return selectElement(list, item);
  });
  if (strict) {
    return output.filter((item) => {
      return item !== undefined;
    });
  } else {
    return output;
  }
};

const takeFromLeft = <ELEM extends any>(list: ELEM[], count: number) => {
  return _.take(list, count);
};
const takeFromRight = <ELEM extends any>(list: ELEM[], count: number) => {
  return _.takeRight(list, count);
};
const dropFromLeft = <ELEM extends any>(list: ELEM[], count: number) => {
  return _.drop(list, count);
};
const dropFromRight = <ELEM extends any>(list: ELEM[], count: number) => {
  return _.dropRight(list, count);
};

const zip = <ELEM extends any>(list: ELEM[]) => {
  return _.zip(list);
};

const zipWith = <ELEM extends any>(list: ELEM[], by: (elem: ELEM) => any) => {
  return _.zipWith(list, by);
};

export default {
  _length,
  firstIndex,
  lastIndex,
  firstElement,
  lastElement,
  selectElement,
  selectElements,
  takeFromLeft,
  takeFromRight,
  dropFromLeft,
  dropFromRight,
  zip,
  zipWith,
};
