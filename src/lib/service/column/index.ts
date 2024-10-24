import _ from 'lodash';
import sheet from '../common';

const getColumn = <SHEET extends any[][]>(entrySheet: SHEET, columnIndex: number) => {
  // @ts-ignore
  let output = entrySheet.map((row, index) => {
    return row[columnIndex];
  });
  return output;
};

const getFirstColumn = <SHEET extends any[][]>(entrySheet: SHEET) => {
  // @ts-ignore
  const reversed = _.zip(entrySheet);
  return _.first(reversed);
};
const getLastColumn = <SHEET extends any[][]>(sheet: SHEET) => {
  // @ts-ignore
  const reversed = _.zip(sheet);
  return _.last(reversed);
};

const getColumns = <SHEET extends any[][]>(entrySheet: SHEET, columnIndexes: number[]) => {
  return columnIndexes.map((columnIndex) => {
    return getColumn(entrySheet, columnIndex);
  });
};

const mergeColumnsWith = <SHEET extends any[][]>(
  entrySheet: SHEET,
  columnIndexes: number[],
  by: (v: any[]) => any
) => {
  let columns = getColumns(entrySheet, columnIndexes);
  let reversed = sheet.reverseSheet(columns);
  return reversed.map((item) => {
    return by(item);
  });
};

export default {
  getColumn,
  getColumns,
  getFirstColumn,
  getLastColumn,
  mergeColumnsWith,
};
