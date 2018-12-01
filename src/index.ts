/**
 * Created by user on 2018/12/1/001.
 */

import { expect } from 'chai';
import { ITSArrayLikeWriteable } from 'ts-type';
import { saveToJson } from './fs';
import { arrayPadEntries, handleSeed, mixinSeed, seedFromUnsafeBuffer } from './seed';
import { handleOptions, isOptions, ARC4_LENGTH } from './util';

export { handleSeed, mixinSeed, seedFromUnsafeBuffer, ARC4_LENGTH }

export interface IOptions<T = ISeedArray> extends Partial<IARC4State<T>>
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

export interface IARC4State<T>
{
	i: number,
	j: number,
	s: IARC4Data<IHandleSeedInput<T>>,
}

export type ISeedArray = ITSArrayLikeWriteable<number> | Buffer;
export type IMixinArrayArgv = ISeedArray | boolean;
export type IARC4Data<T> = T & {
	readonly length: typeof ARC4_LENGTH;
}
export type IHandleSeedInput<T> = T extends ISeedArray ? T : ISeedArray

export default ARC4

export function ARC4<T extends ISeedArray | any>(seedArray?: T | IOptions<T>,
	mixinArray?: IOptions | IMixinArrayArgv,
	opts?: IOptions | boolean,
)
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
	else
	{
		opts = handleOptions(opts);
		// @ts-ignore
		seedArray = seedArray || opts.seedArray;
		mixinArray = mixinArray || opts.mixinArray;
	}

	opts = handleOptions(opts);

	if (typeof mixinArray === 'undefined')
	{
		mixinArray = null;
	}

	let seedmixin: IARC4Data<IHandleSeedInput<T>>;
	let seed;

	if (opts.s)
	{
		// @ts-ignore
		seedmixin = opts.s;
		seedArray = mixinArray = null;
	}
	else
	{
		// @ts-ignore
		seed = handleSeed(seedArray, mixinArray);
		seedmixin = arc4mixin(seed);
	}

	const loop = !!opts.loop;

	let { i, j } = opts;
	let iterator = arc4Generator(seedmixin, opts.loop, i, j);

	//console.log(seed.slice(0, 10), seed.length);
	//console.log(seedmixin.slice(0, 10), seedmixin.length);

	/*
	saveToJson([__dirname, '..', 'test', '_seed.json'], {
		seed,
		seedmixin,
	});
	*/

	let base = {

		get argvSeed(): Exclude<T, IOptions<any>>
		{
			// @ts-ignore
			return seedArray
		},

		get argvMixin(): Exclude<typeof mixinArray, IOptions<any>>
		{
			// @ts-ignore
			return mixinArray
		},

		next()
		{
			let r = iterator.next().value;

			({ i, j } = r);

			return r.v
		},

		transform<T extends Buffer | number[]>(buf: T): T
		{
			let fn = base[Symbol.iterator]();

			// @ts-ignore
			return buf.map((v) => {

				let r = fn.next();

				if (r.done)
				{
					fn = base[Symbol.iterator]();
					r = fn.next();
				}

				return v ^ r.value
			})
		},

		get _seed(): ISeedArray
		{
			return seed;
		},

		get state(): IARC4State<T>
		{
			return {
				i,
				j,
				s: seedmixin,
			};
		},

		* [Symbol.iterator]()
		{
			let iterator = arc4Generator(seedmixin, true, i, j);

			for (let r of iterator)
			{
				({ i, j } = r);

				yield r.v
			}
		},

		toJSON()
		{
			return {
				argvSeed: base.argvSeed,
				argvMixin: base.argvMixin,
				_seed: base._seed,
				state: base.state,
			}
		},
	};

	if (!opts.state)
	{
		Object.defineProperties(base, {
			argvSeed: {
				get() {},
			},
			argvMixin: {
				get() {},
			},
			_seed: {
				get() {},
			},
			state: {
				get() {},
			},
		})
	}

	if (!opts.loop)
	{
		let arr = [];
		let i = 0;

		for (let v of iterator)
		{
			arr[i++] = v;
		}

		iterator = arr[Symbol.iterator]();

		base[Symbol.iterator] = function* ()
		{
			iterator = arr[Symbol.iterator]();

			for (let r of iterator)
			{
				yield r.v
			}
		};

		if (opts.state)
		{
			base.next = () =>
			{
				let r = iterator.next();

				if (r.done)
				{
					iterator = arr[Symbol.iterator]();
					r = iterator.next();
				}

				({ i, j } = r.value);

				return r.value.v;
			};
		}
		else
		{
			base.next = () =>
			{
				let r = iterator.next();

				if (r.done)
				{
					iterator = arr[Symbol.iterator]();
					r = iterator.next();
				}

				return r.value.v;
			};
		}

	}
	else
	{
		/*
		let len = ARC4_LENGTH * 2;
		while (len--)
		{
			iterator.next()
		}
		*/
	}

	mixinArray = opts = null;

	return base
}

/**
 * transform data into arc4 buffer array
 */
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
	let k = i;

	limit = Math.max(seedLength, limit);

	while (limit--)
	{
		k = i % ARC4_LENGTH;

		j = (j + buf[k] + seedArray[i % seedLength]) % ARC4_LENGTH;
		let swap = buf[k];
		buf[k] = buf[j];
		buf[j] = swap;
		i++;
	}

	return buf;
}

export function* arc4Generator(buf: ITSArrayLikeWriteable<number>, loop?: boolean, i = 0, j = 0)
{
	expect(buf).lengthOf.gt(0);
	expect(i).gte(0);
	expect(j).gte(0);

	let index: number, swap: number;
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

			yield {
				v: buf[index],
				i,
				j,
			}
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

			yield {
				v: buf[index],
				i,
				j,
			}
		}
	}
}

Object.freeze(exports)
