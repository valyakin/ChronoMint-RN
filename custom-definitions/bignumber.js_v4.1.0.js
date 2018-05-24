declare module 'bignumber.js' {
  declare type RoundingMode =
    | 'ROUND_UP'
    | 'ROUND_DOWN'
    | 'ROUND_CEIL'
    | 'ROUND_FLOOR'
    | 'ROUND_HALF_UP'
    | 'ROUND_HALF_DOWN'
    | 'ROUND_HALF_EVEN'
    | 'ROUND_HALF_CEIL'
    | 'ROUND_HALF_FLOOR'
    | 'EUCLID'

  declare export interface Format {
    decimalSeparator?: string;
    groupSeparator?: string;
    groupSize?: number;
    secondaryGroupSize?: number;
    fractionGroupSeparator?: string;
    fractionGroupSize?: number;
  }

  declare export interface Configuration {
    DECIMAL_PLACES?: number;
    ROUNDING_MODE?: RoundingMode;
    EXPONENTIAL_AT?: number | [number, number];
    RANGE?: number | [number, number];
    ERRORS?: boolean | number;
    CRYPTO?: boolean | number;
    MODULO_MODE?: RoundingMode;
    POW_PRECISION?: number;
    FORMAT?: Format;
  }

  declare export class BigNumber {
    ROUND_UP: RoundingMode;
    ROUND_DOWN: RoundingMode;
    ROUND_CEIL: RoundingMode;
    ROUND_FLOOR: RoundingMode;
    ROUND_HALF_UP: RoundingMode;
    ROUND_HALF_DOWN: RoundingMode;
    ROUND_HALF_EVEN: RoundingMode;
    ROUND_HALF_CEIL: RoundingMode;
    ROUND_HALF_FLOOR: RoundingMode;
    EUCLID: RoundingMode;
    another(config?: Configuration): typeof BigNumber;
    config(config?: Configuration): Configuration;
    config(
      decimalPlaces?: number,
      roundingMode?: RoundingMode,
      exponentialAt?: number | [number, number],
      range?: number | [number, number],
      errors?: boolean | number,
      crypto?: boolean | number,
      moduloMode?: RoundingMode,
      powPrecision?: number,
      format?: Format,
    ): Configuration;
    max(...args: Array<number | string | BigNumber>): BigNumber;
    max(args: Array<number | string | BigNumber>): BigNumber;
    min(...args: Array<number | string | BigNumber>): BigNumber;
    min(args: Array<number | string | BigNumber>): BigNumber;
    random(dp?: number): BigNumber;
    c: number[];
    e: number;
    s: number;
    constructor(value: number | string | BigNumber, base?: number): this;
    absoluteValue(): BigNumber;
    abs(): BigNumber;
    add(n: number | string | BigNumber, base?: number): BigNumber;
    ceil(): BigNumber;
    comparedTo(n: number | string | BigNumber, base?: number): number;
    cmp(n: number | string | BigNumber, base?: number): number;
    decimalPlaces(): number;
    dp(): number;
    dividedBy(n: number | string | BigNumber, base?: number): BigNumber;
    div(n: number | string | BigNumber, base?: number): BigNumber;
    dividedToIntegerBy(n: number | string | BigNumber, base?: number): BigNumber;
    divToInt(n: number | string | BigNumber, base?: number): BigNumber;
    equals(n: number | string | BigNumber, base?: number): boolean;
    eq(n: number | string | BigNumber, base?: number): boolean;
    floor(): BigNumber;
    greaterThan(n: number | string | BigNumber, base?: number): boolean;
    gt(n: number | string | BigNumber, base?: number): boolean;
    greaterThanOrEqualTo(n: number | string | BigNumber, base?: number): boolean;
    gte(n: number | string | BigNumber, base?: number): boolean;
    isFinite(): boolean;
    isInteger(): boolean;
    isInt(): boolean;
    isNaN(): boolean;
    isNegative(): boolean;
    isNeg(): boolean;
    isZero(): boolean;
    lessThan(n: number | string | BigNumber, base?: number): boolean;
    lt(n: number | string | BigNumber, base?: number): boolean;
    lessThanOrEqualTo(n: number | string | BigNumber, base?: number): boolean;
    lte(n: number | string | BigNumber, base?: number): boolean;
    minus(n: number | string | BigNumber, base?: number): BigNumber;
    modulo(n: number | string | BigNumber, base?: number): BigNumber;
    mod(n: number | string | BigNumber, base?: number): BigNumber;
    mul(n: number | string | BigNumber, base?: number): BigNumber;
    negated(): BigNumber;
    neg(): BigNumber;
    plus(n: number | string | BigNumber, base?: number): BigNumber;
    precision(z?: boolean | number): number;
    sd(z?: boolean | number): number;
    round(dp?: number, rm?: number): BigNumber;
    shift(n: number): BigNumber;
    squareRoot(): BigNumber;
    sqrt(): BigNumber;
    sub(n: number | string | BigNumber, base?: number): BigNumber;
    times(n: number | string | BigNumber, base?: number): BigNumber;
    toDigits(sd?: number, rm?: number): BigNumber;
    toExponential(dp?: number, rm?: number): string;
    toFixed(dp?: number, rm?: number): string;
    toFormat(dp?: number, rm?: number): string;
    toFraction(max?: number | string | BigNumber): [string, string];
    toJSON(): string;
    toNumber(): number;
    toPower(n: number, m?: number | string | BigNumber): BigNumber;
    pow(n: number, m?: number | string | BigNumber): BigNumber;
    toPrecision(sd?: number, rm?: number): string;
    toString(base?: number): string;
    truncated(): BigNumber;
    trunc(): BigNumber;
    valueOf(): string;
  }
}
