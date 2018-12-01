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
    opts = util_1.handleOptions(opts);
    if (typeof mixinArray === 'undefined') {
        mixinArray = null;
    }
    // @ts-ignore
    const seed = seed_1.handleSeed(seedArray, mixinArray);
    let seedmixin = arc4mixin(seed_1.arrayPadEntries(seed));
    let iterator = arc4Generator(seedmixin, opts.loop);
    //console.log(seed.slice(0, 10));
    //console.log(seedmixin.slice(0, 10));
    let base = {
        get seed() {
            // @ts-ignore
            return seedArray;
        },
        next() {
            return iterator.next();
        },
        get _seed() {
            return seed;
        },
        get state() {
            return seedmixin;
        },
        [Symbol.iterator]() {
            return arc4Generator(seedmixin);
        },
    };
    if (!opts.loop) {
        let arr = [];
        let i = 0;
        for (let v of iterator) {
            arr[i++] = v;
        }
        iterator = arr[Symbol.iterator]();
        base[Symbol.iterator] = function* () {
            iterator = arr[Symbol.iterator]();
            yield* iterator;
        };
    }
    mixinArray = opts = null;
    return base;
}
exports.ARC4 = ARC4;
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
    while (limit--) {
        j = (j + buf[i] + seedArray[i % seedLength]) % util_1.ARC4_LENGTH;
        let swap = buf[i];
        buf[i] = buf[j];
        buf[j] = swap;
        i++;
    }
    return buf;
}
exports.arc4mixin = arc4mixin;
function* arc4Generator(buf, loop) {
    chai_1.expect(buf).lengthOf.gt(0);
    let index, swap;
    let i = 0;
    let j = 0;
    let len = buf.length;
    if (loop) {
        while (true) {
            i = (i + 1) % len;
            j = (j + buf[i]) % len;
            swap = buf[i];
            buf[i] = buf[j];
            buf[j] = swap;
            index = (buf[i] + buf[j]) % len;
            yield buf[index];
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
            yield buf[index];
        }
    }
}
exports.arc4Generator = arc4Generator;
Object.freeze(exports);
