import _ from 'lodash';

const reverseSheet = <SHEET extends any[][]>(entrySheet: SHEET) => {
  return _.zip(...entrySheet);
};

export default {
  reverseSheet,
};
