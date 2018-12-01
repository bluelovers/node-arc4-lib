/**
 * Created by user on 2018/12/1/001.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
const seed_1 = require("./seed");
exports.handleSeed = seed_1.handleSeed;
exports.mixinSeed = seed_1.mixinSeed;
exports.seedFromUnsafeBuffer = seed_1.seedFromUnsafeBuffer;
const util_1 = require("./util");
exports.ARC4_LENGTH = util_1.ARC4_LENGTH;
exports.default = ARC4;
function ARC4(seedArray, mixinArray, opts) {
    // @ts-ignore
    if (seedArray && util_1.isOptions(seedArray)) {
        // @ts-ignore
        opts = util_1.handleOptions(seedArray);
        // @ts-ignore
        seedArray = opts.seedArray;
        mixinArray = opts.mixinArray || mixinArray;
    }
    else if (util_1.isOptions(mixinArray)) {
        opts = util_1.handleOptions(mixinArray);
        // @ts-ignore
        seedArray = opts.seedArray || seedArray;
        mixinArray = opts.mixinArray;
    }
    else {
        opts = util_1.handleOptions(opts);
        // @ts-ignore
        seedArray = seedArray || opts.seedArray;
        mixinArray = mixinArray || opts.mixinArray;
    }
    opts = util_1.handleOptions(opts);
    if (typeof mixinArray === 'undefined') {
        mixinArray = null;
    }
    let seedmixin;
    let seed;
    if (opts.s) {
        // @ts-ignore
        seedmixin = opts.s;
        seedArray = mixinArray = null;
    }
    else {
        // @ts-ignore
        seed = seed_1.handleSeed(seedArray, mixinArray);
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
        get argvSeed() {
            // @ts-ignore
            return seedArray;
        },
        get argvMixin() {
            // @ts-ignore
            return mixinArray;
        },
        next() {
            let r = iterator.next().value;
            ({ i, j } = r);
            return r.v;
        },
        transform(buf) {
            let fn = base[Symbol.iterator]();
            // @ts-ignore
            return buf.map((v) => {
                let r = fn.next();
                if (r.done) {
                    fn = base[Symbol.iterator]();
                    r = fn.next();
                }
                return v ^ r.value;
            });
        },
        get _seed() {
            return seed;
        },
        get state() {
            return {
                i,
                j,
                s: seedmixin,
            };
        },
        *[Symbol.iterator]() {
            let iterator = arc4Generator(seedmixin, false, i, j);
            for (let r of iterator) {
                ({ i, j } = r);
                yield r.v;
            }
        },
        toJSON() {
            return {
                argvSeed: base.argvSeed,
                argvMixin: base.argvMixin,
                _seed: base._seed,
                state: base.state,
            };
        },
    };
    if (!opts.state) {
        Object.defineProperties(base, {
            argvSeed: {
                get() { },
            },
            argvMixin: {
                get() { },
            },
            _seed: {
                get() { },
            },
            state: {
                get() { },
            },
        });
    }
    if (!opts.loop) {
        let arr = [];
        let i = 0;
        for (let v of iterator) {
            arr[i++] = v;
        }
        iterator = arr[Symbol.iterator]();
        base[Symbol.iterator] = function* () {
            iterator = arr[Symbol.iterator]();
            for (let r of iterator) {
                yield r.v;
            }
        };
        if (opts.state) {
            base.next = () => {
                let r = iterator.next();
                if (r.done) {
                    iterator = arr[Symbol.iterator]();
                    r = iterator.next();
                }
                ({ i, j } = r.value);
                return r.value.v;
            };
        }
        else {
            base.next = () => {
                let r = iterator.next();
                if (r.done) {
                    iterator = arr[Symbol.iterator]();
                    r = iterator.next();
                }
                return r.value.v;
            };
        }
    }
    else {
        /*
        let len = ARC4_LENGTH * 2;
        while (len--)
        {
            iterator.next()
        }
        */
    }
    mixinArray = opts = null;
    return base;
}
exports.ARC4 = ARC4;
/**
 * transform data into arc4 buffer array
 */
function arc4mixin(seedArray) {
    let buf = seed_1.arrayPadEntries(seedArray);
    let limit = util_1.ARC4_LENGTH;
    //let tmp: number[] = [];
    //console.log(seedArray === buf);
    //debugger;
    //expect(seedArray).not.equal(buf);
    while (limit--) {
        //tmp[limit] = buf[limit] % ARC4_LENGTH;
        buf[limit] = limit;
    }
    limit = util_1.ARC4_LENGTH;
    //console.log(seedArray);
    //console.log(buf);
    let seedLength = seedArray.length;
    let i = 0;
    let j = 0;
    let k = i;
    limit = Math.max(seedLength, limit);
    while (limit--) {
        k = i % util_1.ARC4_LENGTH;
        j = (j + buf[k] + seedArray[i % seedLength]) % util_1.ARC4_LENGTH;
        let swap = buf[k];
        buf[k] = buf[j];
        buf[j] = swap;
        i++;
    }
    return buf;
}
exports.arc4mixin = arc4mixin;
function* arc4Generator(buf, loop, i = 0, j = 0) {
    chai_1.expect(buf).lengthOf.gt(0);
    chai_1.expect(i).gte(0);
    chai_1.expect(j).gte(0);
    let index, swap;
    let len = buf.length;
    if (loop) {
        while (true) {
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
            };
        }
    }
    else {
        let limit = len;
        while (limit--) {
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
            };
        }
    }
}
exports.arc4Generator = arc4Generator;
Object.freeze(exports);
