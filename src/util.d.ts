import { IOptions } from './index';
export declare const ARC4_LENGTH = 256;
export declare function _numHex(input: number | bigint): string;
/**
 * avoid if iterator is never done
 */
export declare function arrayFromIterator<T extends any>(arr: IterableIterator<T>, limit?: number): T[];
export declare function createArray(length?: number, mapFn?: (v: number, i: number) => number): number[];
export declare function handleOptions(opts?: IOptions | boolean): IOptions;
export declare function isOptions(opts: any): opts is IOptions;
