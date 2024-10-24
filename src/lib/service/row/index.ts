import _ from 'lodash';

const getRow = <SHEET extends any[][]>(entrySheet: SHEET, entryIndex: number) => {
  // @ts-ignore
  let output = entrySheet.find((row, index) => {
    return index == entryIndex;
  });
  if (output) {
    return output;
  } else {
    return [];
  }
};
const getRows = <SHEET extends any[][]>(entrySheet: SHEET, entryIndex: number[]) => {
  return entryIndex.map((item) => {
    return getRow(entrySheet, item);
  });
};

const getFirstRow = <SHEET extends any[][]>(entrySheet: SHEET) => {
  return _.first(entrySheet);
};
const getLastRow = <SHEET extends any[][]>(entrySheet: SHEET) => {
  return _.last(entrySheet);
};

const mergeRowsWith = <SHEET extends any[][]>(
  entrySheet: SHEET,
  columnIndexes: number[],
  by: (v: any[]) => any
) => {
  let rows = getRows(entrySheet, columnIndexes);
  return rows.map((item) => {
    return by(item);
  });
};

export default {
  getRow,
  getRows,
  getFirstRow,
  getLastRow,
  mergeRowsWith,
};
