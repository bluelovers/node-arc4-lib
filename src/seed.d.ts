/// <reference types="node" />
import { ITSArrayLikeWriteable } from 'ts-type';
import { IARC4Data, IHandleSeedInput, IMixinArrayArgv, ISeedArray } from './index';
export declare function seedFromUnsafeBuffer(len?: number, mixinArray?: IMixinArrayArgv): IARC4Data<Buffer>;
/**
 * mixin seedArray with mixinArray
 */
export declare function mixinSeed<T extends ISeedArray>(seedArray: T, mixinArray?: IMixinArrayArgv): IARC4Data<T>;
export declare function handleSeed<T extends ISeedArray | any | string | any[]>(input: T, mixinArray?: IMixinArrayArgv, deep?: number): IHandleSeedInput<T>;
/**
 * clone current input and fill to fixed length (ARC4_LENGTH = 256)
 */
export declare function arrayPadEntries<T extends ITSArrayLikeWriteable<number> | Buffer>(buf: T): IARC4Data<T>;
export declare function _arrayPadEntries<T extends ITSArrayLikeWriteable<number> | Buffer>(buf: T, targetLength?: number): T;
