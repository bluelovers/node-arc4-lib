/**
 * Created by user on 2018/12/1/001.
 */
/// <reference types="node" />
import { ITSArrayLikeWriteable } from 'ts-type';
import { handleSeed, mixinSeed, seedFromUnsafeBuffer } from './seed';
import { ARC4_LENGTH } from './util';
export { handleSeed, mixinSeed, seedFromUnsafeBuffer, ARC4_LENGTH };
export interface IOptions<T = ISeedArray> extends Partial<IARC4State<T>> {
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
export interface IARC4State<T> {
    i: number;
    j: number;
    s: IARC4Data<IHandleSeedInput<T>>;
}
export declare type ISeedArray = ITSArrayLikeWriteable<number> | Buffer;
export declare type IMixinArrayArgv = ISeedArray | boolean;
export declare type IARC4Data<T> = T & {
    readonly length: typeof ARC4_LENGTH;
};
export declare type IHandleSeedInput<T> = T extends ISeedArray ? T : ISeedArray;
export default ARC4;
export declare function ARC4<T extends ISeedArray | any>(seedArray?: T | IOptions<T>, mixinArray?: IOptions | IMixinArrayArgv, opts?: IOptions | boolean): {
    readonly argvSeed: Exclude<T, IOptions<any>>;
    readonly argvMixin: IMixinArrayArgv;
    next(): number;
    transform<T_1 extends number[] | Buffer>(buf: T_1): T_1;
    readonly _seed: ISeedArray;
    readonly state: IARC4State<T>;
    [Symbol.iterator](): IterableIterator<number>;
    toJSON(): {
        argvSeed: Exclude<T, IOptions<any>>;
        argvMixin: IMixinArrayArgv;
        _seed: ISeedArray;
        state: IARC4State<T>;
    };
};
/**
 * transform data into arc4 buffer array
 */
export declare function arc4mixin<T extends ISeedArray>(seedArray: T): IARC4Data<T>;
export declare function arc4Generator(buf: ITSArrayLikeWriteable<number>, loop?: boolean, i?: number, j?: number): IterableIterator<{
    v: number;
    i: number;
    j: number;
}>;
