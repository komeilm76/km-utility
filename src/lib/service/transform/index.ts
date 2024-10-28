export type ISpaceEntry<V extends number> =
  | V
  | [V]
  | [V, V]
  | [V, V, V]
  | [V, V, V, V]
  | { top: V; right: V; bottom: V; left: V }
  | `${V}`
  | `${V},${V}`
  | `${V},${V},${V}`
  | `${V},${V},${V},${V}`;

type ISpaceOutput<V extends number> = { top: V; right: V; bottom: V; left: V };

export type ISizeEntry<V extends number> =
  | V
  | [V]
  | [V, V]
  | { width: V; height: V }
  | `${V}`
  | `${V},${V}`;

type ISizeOutput<V extends number> = { width: V; height: V };

export type IPoint2dEntry<V extends number> =
  | V
  | [V]
  | [V, V]
  | { x: V; y: V }
  | `${V}`
  | `${V},${V}`;
type IPoint2dOutput<V extends number> = { x: V; y: V };

export type IPointExcel = `${string}${number}`;
export type IRangeExcel =
  | `${IPointExcel}:${IPointExcel}`
  | `${string}:${string}`
  | `${number}:${number}`;

export type IPoint3dEntry<V extends number> =
  | V
  | [V]
  | [V, V, V]
  | { x: V; y: V; z: V }
  | `${V}`
  | `${V},${V},${V}`;
type IPoint3dOutput<V extends number> = { x: V; y: V; z: V };

// space
const makeSpace = <
  NUM extends number = number,
  VALUE extends ISpaceEntry<NUM> = ISpaceEntry<NUM>,
  OUTPUT extends {
    top: NUM;
    right: NUM;
    bottom: NUM;
    left: NUM;
  } = {
    top: NUM;
    right: NUM;
    bottom: NUM;
    left: NUM;
  }
>(
  value: VALUE
) => {
  let output: ISpaceOutput<number> = {
    top: NaN,
    right: NaN,
    bottom: NaN,
    left: NaN,
  };
  if (typeof value == 'number') {
    output.top = value;
    output.right = value;
    output.bottom = value;
    output.left = value;
  }
  if (typeof value == 'object') {
    if (Array.isArray(value)) {
      if (value.length == 1) {
        output.top = value[0];
        output.right = value[0];
        output.bottom = value[0];
        output.left = value[0];
      }
      if (value.length == 2) {
        output.top = value[0];
        output.right = value[1];
        output.bottom = value[0];
        output.left = value[1];
      }
      if (value.length == 3) {
        output.top = value[0];
        output.right = value[1];
        output.bottom = value[2];
        output.left = value[1];
      }
      if (value.length == 4) {
        output.top = value[0];
        output.right = value[1];
        output.bottom = value[2];
        output.left = value[3];
      }
    } else {
      output.top = value.top;
      output.right = value.right;
      output.bottom = value.bottom;
      output.left = value.left;
    }
  }
  if (typeof value == 'string') {
    let splitedValue = value.split(',').map((item) => Number(item));
    if (splitedValue.length == 1 && Array.isArray(splitedValue)) {
      output.top = splitedValue[0];
      output.right = splitedValue[0];
      output.bottom = splitedValue[0];
      output.left = splitedValue[0];
    }
    if (splitedValue.length == 2 && Array.isArray(splitedValue)) {
      output.top = splitedValue[0];
      output.right = splitedValue[1];
      output.bottom = splitedValue[0];
      output.left = splitedValue[1];
    }
    if (splitedValue.length == 3 && Array.isArray(splitedValue)) {
      output.top = splitedValue[0];
      output.right = splitedValue[1];
      output.bottom = splitedValue[2];
      output.left = splitedValue[1];
    }
    if (splitedValue.length == 4 && Array.isArray(splitedValue)) {
      output.top = splitedValue[0];
      output.right = splitedValue[1];
      output.bottom = splitedValue[2];
      output.left = splitedValue[3];
    }
  }
  return output as OUTPUT;
};

// space
const makeSize = <
  NUM extends number = number,
  VALUE extends ISizeEntry<NUM> = ISizeEntry<NUM>,
  OUTPUT extends {
    width: NUM;
    height: NUM;
  } = {
    width: NUM;
    height: NUM;
  }
>(
  value: VALUE
) => {
  let output: ISizeOutput<number> = {
    width: NaN,
    height: NaN,
  };
  if (typeof value == 'number') {
    output.width = value;
    output.height = value;
  }
  if (typeof value == 'object') {
    if (Array.isArray(value)) {
      if (value.length == 1) {
        output.width = value[0];
        output.height = value[0];
      }
      if (value.length == 2) {
        output.width = value[0];
        output.height = value[1];
      }
    } else {
      output.width = value.width;
      output.height = value.height;
    }
  }
  if (typeof value == 'string') {
    let splitedValue = value.split(',').map((item) => Number(item));
    if (splitedValue.length == 1 && Array.isArray(splitedValue)) {
      output.width = splitedValue[0];
      output.height = splitedValue[0];
    }
    if (splitedValue.length == 2 && Array.isArray(splitedValue)) {
      output.width = splitedValue[0];
      output.height = splitedValue[1];
    }
  }
  return output as OUTPUT;
};
// 2d point
const make2dPoint = <
  NUM extends number = number,
  VALUE extends IPoint2dEntry<NUM> = IPoint2dEntry<NUM>,
  OUTPUT extends {
    x: NUM;
    y: NUM;
  } = {
    x: NUM;
    y: NUM;
  }
>(
  value: VALUE
) => {
  let output: IPoint2dOutput<number> = {
    x: NaN,
    y: NaN,
  };
  if (typeof value == 'number') {
    output.x = value;
    output.y = value;
  }
  if (typeof value == 'object') {
    if (Array.isArray(value)) {
      if (value.length == 1) {
        output.x = value[0];
        output.y = value[0];
      }
      if (value.length == 2) {
        output.x = value[0];
        output.y = value[1];
      }
    } else {
      output.x = value.x;
      output.y = value.y;
    }
  }
  if (typeof value == 'string') {
    let splitedValue = value.split(',').map((item) => Number(item));
    if (splitedValue.length == 1 && Array.isArray(splitedValue)) {
      output.x = splitedValue[0];
      output.y = splitedValue[0];
    }
    if (splitedValue.length == 2 && Array.isArray(splitedValue)) {
      output.x = splitedValue[0];
      output.y = splitedValue[1];
    }
  }
  return output as OUTPUT;
};

// 3d point
const make3dPoint = <
  NUM extends number = number,
  VALUE extends IPoint3dEntry<NUM> = IPoint3dEntry<NUM>,
  OUTPUT extends {
    x: NUM;
    y: NUM;
    z: NUM;
  } = {
    x: NUM;
    y: NUM;
    z: NUM;
  }
>(
  value: VALUE
) => {
  let output: IPoint3dOutput<number> = {
    x: NaN,
    y: NaN,
    z: NaN,
  };
  if (typeof value == 'number') {
    output.x = value;
    output.y = value;
    output.z = value;
  }
  if (typeof value == 'object') {
    if (Array.isArray(value)) {
      if (value.length == 1) {
        output.x = value[0];
        output.y = value[0];
        output.z = value[0];
      }
      if (value.length == 3) {
        output.x = value[0];
        output.y = value[1];
        output.z = value[2];
      }
    } else {
      output.x = value.x;
      output.y = value.y;
      output.z = value.z;
    }
  }
  if (typeof value == 'string') {
    let splitedValue = value.split(',').map((item) => Number(item));
    if (splitedValue.length == 1 && Array.isArray(splitedValue)) {
      output.x = splitedValue[0];
      output.y = splitedValue[0];
      output.z = splitedValue[0];
    }
    if (splitedValue.length == 3 && Array.isArray(splitedValue)) {
      output.x = splitedValue[0];
      output.y = splitedValue[1];
      output.z = splitedValue[2];
    }
  }
  return output as OUTPUT;
};

// excel point
const make2dPointFromExcelPoint = <ENTRY_POINT extends IPointExcel>(point: ENTRY_POINT) => {
  let y = point.match(/[A-Z]+/)?.[0] as string | undefined;
  let x = point.match(/\d+/i)?.[0] as string | undefined;

  let standardY = y
    ? y.split('').reduce((r: any, a: any) => r * 26 + parseInt(a, 36) - 9, 0) - 1
    : Infinity;
  let standardX = x ? Number(x) - 1 : Infinity;
  let output: IPoint2dOutput<number> = {
    x: standardX,
    y: standardY,
  };
  return output;
};

const getExcelEntryFormat = <ENTRY extends IRangeExcel | IPointExcel>(point: ENTRY) => {
  if (point.includes(':')) {
    return 'range';
  } else {
    return 'point';
  }
};

const make2dRangeFromExcelRange = <RANGE extends IRangeExcel>(range: RANGE) => {
  const format = getExcelEntryFormat(range);
  if (format == 'range') {
    const [start, end] = range.split(':') as [IPointExcel, IPointExcel];
    let startPoint = make2dPointFromExcelPoint(start);
    let endPoint = make2dPointFromExcelPoint(end);
    let output: { start: IPoint2dOutput<number>; end: IPoint2dOutput<number> } = {
      start: {
        x: startPoint.x == Infinity ? 0 : startPoint.x,
        y: startPoint.y == Infinity ? 0 : startPoint.y,
      },
      end: { x: endPoint.x, y: endPoint.y },
    };

    return output;
  } else {
    throw Error('Entry is Not Valid');
  }
};

const makeExcelPointFrom2dPoint = <POINT extends IPoint2dEntry<number>>(point: POINT) => {
  let { x, y } = make2dPoint(point);
  let output: IPointExcel = 'A1';
  // Handle standard cases like A1, B7, C4
  let column = '';
  while (y >= 0) {
    column = String.fromCharCode((y % 26) + 65) + column;
    y = Math.floor(y / 26) - 1;
  }
  output = (column + (x + 1)) as IPointExcel;
  return output;
};
const makeExcelRangeFrom2dRange = <POINT extends IPoint2dEntry<number>>(range: {
  start: POINT;
  end: POINT;
}) => {
  let { start, end } = range;
  const startPoint = makeExcelPointFrom2dPoint(start);
  const endPoint = makeExcelPointFrom2dPoint(end);

  let output: IRangeExcel = `${startPoint}:${endPoint}`;
  return output;
};
type IUnit = 'px' | 'rem' | 'em' | 'in' | 'cm' | 'pt' | 'pc';
enum EUnit {
  'px' = 1,
  'rem' = 16,
  'em' = 16,
  'in' = 96,
  'cm' = 38.4,
  'pt' = 72,
  'pc' = 6,
}
const standardUnits = [
  {
    name: 'px',
    value: EUnit.px,
  },
  {
    name: 'rem',
    value: EUnit.rem,
  },
  {
    name: 'em',
    value: EUnit.em,
  },
  {
    name: 'in',
    value: EUnit.in,
  },
  {
    name: 'cm',
    value: EUnit.cm,
  },
  {
    name: 'pt',
    value: EUnit.pt,
  },
  {
    name: 'pc',
    value: EUnit.pc,
  },
];
type IAmount = `${number}${IUnit}` | `${number}` | number;
const swapUnit = (entryAmount: IAmount, outputUnit: IUnit) => {
  let standardAmount = String(entryAmount);
  console.log('standardAmount', standardAmount);

  let unit = (standardAmount.match(/[A-Z]+/i)?.[0] as IUnit | undefined) || 'px';
  // let num = standardAmount.match(/\d+/i)?.[0] as string | undefined;
  let num = standardAmount.match(/\d+(\.\d+)?/i)?.[0] as string | undefined;
  console.log('num', num);

  const unitConfig = standardUnits.filter((i) => i.name == unit)[0];
  const outputUnitConfig = standardUnits.filter((i) => i.name == outputUnit)[0];
  let ratio = unitConfig.value / outputUnitConfig.value;
  return parseFloat(num || '0') * ratio;
};

export default {
  makeSpace,
  makeSize,
  make2dPoint,
  make3dPoint,
  make2dPointFromExcelPoint,
  makeExcelPointFrom2dPoint,
  make2dRangeFromExcelRange,
  makeExcelRangeFrom2dRange,
  swapUnit,
};
