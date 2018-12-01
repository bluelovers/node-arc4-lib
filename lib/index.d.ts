/**
 * Created by user on 2018/12/1/001.
 */
/// <reference types="node" />
import { ITSArrayLikeWriteable } from 'ts-type';
import { handleSeed, mixinSeed, seedFromUnsafeBuffer } from './seed';
import { ARC4_LENGTH } from './util';
export { handleSeed, mixinSeed, seedFromUnsafeBuffer, ARC4_LENGTH };
export interface IOptions<T = ISeedArray> {
    seedArray?: T;
    mixinArray?: IMixinArrayArgv;
    /**
     * make iterator never end
     */
    loop?: boolean;
    /**
     * show arc4 state and real seed
     */
    state?: boolean;
}
export declare type ISeedArray = ITSArrayLikeWriteable<number> | Buffer;
export declare type IMixinArrayArgv = ISeedArray | boolean;
export declare type IARC4Data<T> = T & {
    readonly length: typeof ARC4_LENGTH;
};
export declare type IHandleSeedInput<T> = T extends ISeedArray ? T : ISeedArray;
export default ARC4;
export declare function ARC4<T extends ISeedArray | any>(seedArray?: T | IOptions<T>, mixinArray?: IOptions | IMixinArrayArgv, opts?: IOptions | boolean): {
    readonly seed: Exclude<T, IOptions<ISeedArray>>;
    next(): IteratorResult<number>;
    readonly _seed: ISeedArray;
    readonly state: ISeedArray;
    [Symbol.iterator](): IterableIterator<number>;
};
export declare function arc4mixin<T extends ISeedArray>(seedArray: T): IARC4Data<T>;
export declare function arc4Generator(buf: ITSArrayLikeWriteable<number>, loop?: boolean): IterableIterator<number>;
