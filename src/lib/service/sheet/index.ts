import _ from 'lodash';
import transform, { IRangeExcel } from '../transform';

type IPoint =
  | {
      x: IPointValue;
      y: IPointValue;
    }
  | [IPointValue, IPointValue]
  | `${IPointValue},${IPointValue}`
  | IExelPoint;
type IPointValue = number;

type IExelPoint = `${string}${number | string}`;

function excelPointToIndex(address: string) {
  let y = address.match(/[A-Z]+/)?.[0];
  let x = address.match(/\d+/i)?.[0];

  let standardY = y
    ? y.split('').reduce((r: any, a: any) => r * 26 + parseInt(a, 36) - 9, 0) - 1
    : Infinity;
  let standardX = x ? Number(x) - 1 : address.match(/\d+/) === null ? Infinity : -1;

  return {
    y: standardY,
    x: standardX,
  };
}

const getStandardPoint = <POINT extends IPoint>(point: POINT) => {
  if (typeof point == 'string') {
    if (point.includes(',')) {
      let splited = point.split(',').map((item) => {
        return _.toNumber(item);
      });
      return {
        x: splited[0],
        y: splited[1],
      };
    } else {
      let createdPointFromExel = excelPointToIndex(point);
      return {
        x: createdPointFromExel.x,
        y: createdPointFromExel.y,
      };
    }
  } else if (typeof point == 'object' && Array.isArray(point)) {
    return {
      x: point[0],
      y: point[1],
    };
  } else {
    return {
      x: point.x,
      y: point.y,
    };
  }
};
const makeRange = <SHEET extends any[][]>(
  sheet: SHEET,
  options: { start: IPoint; end: IPoint }
) => {
  let standardOptions = _.mapValues(options, (v) => getStandardPoint(v));

  // @ts-ignore
  let filteredXRangeData = sheet.filter((row, index) => {
    return index >= standardOptions.start.x && index <= standardOptions.end.x;
  });

  let filteredYRangeData = filteredXRangeData.map((row) => {
    // @ts-ignore
    return row.filter((item, index) => {
      return index >= standardOptions.start.y && index <= standardOptions.end.y;
    });
  });
  return filteredYRangeData;
};

// const toChartOptions = <SHEET extends any[][]>(
//   sheet: SHEET,
//   options: {
//     dataStartPoint: IPoint;
//     dataEndPoint: IPoint;
//     xStartPoint: IPoint;
//     xEndPoint: IPoint;
//     yStartPoint: IPoint;
//     yEndPoint: IPoint;
//     chartType: 'line' | 'bar';
//     mapXItemFunc?: (v: any) => any;
//     mapXFunc?: (v: any[]) => any;
//     mapYItemFunc?: (v: any) => any;
//     mapYFunc?: (v: any[]) => any;
//   }
// ) => {
//   const data = makeRange(sheet, { start: options.dataStartPoint, end: options.dataEndPoint });
//   let x = makeRange(sheet, { start: options.xStartPoint, end: options.xEndPoint }).map((item) => {
//     return options.mapXItemFunc ? options.mapXItemFunc(item) : item;
//   });
//   x = options.mapXFunc ? options.mapXFunc(x) : x;
//   let y = makeRange(sheet, { start: options.yStartPoint, end: options.yEndPoint }).map((item) => {
//     return options.mapYItemFunc ? options.mapYItemFunc(item) : item;
//   });
//   y = options.mapYFunc ? options.mapYFunc(y) : y;
//   const series = y.map((item, index) => {
//     return {
//       name: item,
//       type: options.chartType,
//       data: data.map((i) => {
//         return i[index];
//       }),
//     };
//   });
//   return {
//     data,
//     x: x,
//     y: y,
//     series,
//   };
// };

export type IChartOptions = {
  dataRange: IRangeExcel;
  xRange: IRangeExcel;
  yRange: IRangeExcel;
  chartType: 'line' | 'bar';
  mapXItemFunc?: (v: any) => any;
  mapXFunc?: (v: any[]) => any;
  mapYItemFunc?: (v: any) => any;
  mapYFunc?: (v: any[]) => any;
};

const toChartOptions = <SHEET extends any[][]>(sheet: SHEET, options: IChartOptions) => {
  const standardDataRange = transform.make2dRangeFromExcelRange(options.dataRange);
  const standardXRange = transform.make2dRangeFromExcelRange(options.xRange);
  const standardYRange = transform.make2dRangeFromExcelRange(options.yRange);
  const data = makeRange(sheet, standardDataRange);
  let x = makeRange(sheet, standardXRange).map((item) => {
    return options.mapXItemFunc ? options.mapXItemFunc(item) : item;
  });
  x = options.mapXFunc ? options.mapXFunc(x) : x;
  let y = makeRange(sheet, standardYRange).map((item) => {
    return options.mapYItemFunc ? options.mapYItemFunc(item) : item;
  });
  y = options.mapYFunc ? options.mapYFunc(y) : y;
  const series = y.map((item, index) => {
    return {
      name: item,
      type: options.chartType,
      data: data.map((i) => {
        return i[index];
      }),
    };
  });
  return {
    data,
    x: x,
    y: y,
    series,
  };
};

export default {
  toChartOptions,
  makeRange,
};
