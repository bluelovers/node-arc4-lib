/**
 * Created by user on 2018/12/1/001.
 */

import { expect } from 'chai';
import { ITSArrayLikeWriteable } from 'ts-type';
import { arrayPadEntries, handleSeed, mixinSeed, seedFromUnsafeBuffer } from './seed';
import { handleOptions, isOptions, ARC4_LENGTH } from './util';
export { handleSeed, mixinSeed, seedFromUnsafeBuffer, ARC4_LENGTH }

export interface IOptions<T = ISeedArray>
{
	seedArray?: T,
	mixinArray?: IMixinArrayArgv,
	/**
	 * make iterator never end
	 */
	loop?: boolean,
	/**
	 * show arc4 state and real seed
	 */
	state?: boolean,
}

export type ISeedArray = ITSArrayLikeWriteable<number> | Buffer;
export type IMixinArrayArgv = ISeedArray | boolean;
export type IARC4Data<T> = T & {
	readonly length: typeof ARC4_LENGTH;
}
export type IHandleSeedInput<T> = T extends ISeedArray ? T : ISeedArray

export default ARC4

export function ARC4<T extends ISeedArray | any>(seedArray?: T | IOptions<T>, mixinArray?: IOptions | IMixinArrayArgv, opts?: IOptions | boolean)
{
	// @ts-ignore
	if (seedArray && isOptions(seedArray))
	{
		// @ts-ignore
		opts = handleOptions(seedArray);

		// @ts-ignore
		seedArray = opts.seedArray;
		mixinArray = opts.mixinArray || mixinArray;
	}
	else if (isOptions(mixinArray))
	{
		opts = handleOptions(mixinArray);

		// @ts-ignore
		seedArray = opts.seedArray || seedArray;
		mixinArray = opts.mixinArray;
	}

	opts = handleOptions(opts);

	if (typeof mixinArray === 'undefined')
	{
		mixinArray = null;
	}

	// @ts-ignore
	const seed = handleSeed(seedArray, mixinArray);
	let seedmixin = arc4mixin(arrayPadEntries(seed));
	let iterator = arc4Generator(seedmixin, opts.loop);

	//console.log(seed.slice(0, 10));
	//console.log(seedmixin.slice(0, 10));

	let base = {
		get seed(): Exclude<T, IOptions>
		{
			// @ts-ignore
			return seedArray
		},

		next()
		{
			return iterator.next()
		},

		get _seed(): ISeedArray
		{
			return seed;
		},

		get state(): ISeedArray
		{
			return seedmixin;
		},

		[Symbol.iterator]()
		{
			return arc4Generator(seedmixin);
		},
	};

	if (!opts.loop)
	{
		let arr = [];
		let i = 0;

		for (let v of iterator)
		{
			arr[i++] = v;
		}

		iterator = arr[Symbol.iterator]();

		base[Symbol.iterator] = function *()
		{
			iterator = arr[Symbol.iterator]();

			yield * iterator
		};
	}

	mixinArray = opts = null;

	return base
}

export function arc4mixin<T extends ISeedArray>(seedArray: T): IARC4Data<T>
{
	let buf = arrayPadEntries(seedArray);
	let limit = ARC4_LENGTH;
	//let tmp: number[] = [];

	//console.log(seedArray === buf);

	//debugger;
	//expect(seedArray).not.equal(buf);

	while (limit--)
	{
		//tmp[limit] = buf[limit] % ARC4_LENGTH;
		buf[limit] = limit
	}

	limit = ARC4_LENGTH;

	//console.log(seedArray);
	//console.log(buf);

	let seedLength = seedArray.length;
	let i = 0;
	let j = 0;

	while (limit--)
	{
		j = (j + buf[i] + seedArray[i % seedLength]) % ARC4_LENGTH;
		let swap = buf[i];
		buf[i] = buf[j];
		buf[j] = swap;
		i++;
	}

	return buf;
}

export function* arc4Generator(buf: ITSArrayLikeWriteable<number>, loop?: boolean)
{
	expect(buf).lengthOf.gt(0);

	let index: number, swap: number;
	let i = 0;
	let j = 0;
	let len = buf.length;

	if (loop)
	{
		while (true)
		{
			i = (i + 1) % len;
			j = (j + buf[i]) % len;

			swap = buf[i];
			buf[i] = buf[j];
			buf[j] = swap;

			index = (buf[i] + buf[j]) % len;

			yield buf[index]
		}
	}
	else
	{
		let limit = len;

		while (limit--)
		{
			i = (i + 1) % len;
			j = (j + buf[i]) % len;

			swap = buf[i];
			buf[i] = buf[j];
			buf[j] = swap;

			index = (buf[i] + buf[j]) % len;

			yield buf[index]
		}
	}
}

Object.freeze(exports)
