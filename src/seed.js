Object.defineProperty(exports, "__esModule", { value: true });
const util_1 = require("./util");
const INTERNAL_SEED_MIXIN_ARRAY = require("../seed.json");
function seedFromUnsafeBuffer(len = util_1.ARC4_LENGTH, mixinArray) {
    return mixinSeed(Buffer.allocUnsafe(len || util_1.ARC4_LENGTH), mixinArray);
}
exports.seedFromUnsafeBuffer = seedFromUnsafeBuffer;
/**
 * mixin seedArray with mixinArray
 */
function mixinSeed(seedArray, mixinArray) {
    let buf = arrayPadEntries(seedArray);
    let i = buf.length;
    if (mixinArray === true) {
        mixinArray = util_1.createArray(util_1.ARC4_LENGTH, (v, i) => i);
    }
    else if (!mixinArray) {
        mixinArray = INTERNAL_SEED_MIXIN_ARRAY;
    }
    else {
    }
    let mixinArrayLength = mixinArray.length;
    while (i--) {
        buf[i] = ((buf[i] + mixinArray[i % mixinArrayLength]) | 0) % util_1.ARC4_LENGTH;
    }
    return buf;
}
exports.mixinSeed = mixinSeed;
function handleSeed(input, mixinArray, deep) {
    let ti = typeof input;
    let is_array = Array.isArray(input);
    if (Buffer.isBuffer(input)) {
    }
    // @ts-ignore
    else if (ti === 'undefined' || input === null || input === '') {
        // @ts-ignore
        input = seedFromUnsafeBuffer();
    }
    else if (ti === 'number' || ti === 'bigint') {
        // @ts-ignore
        if (((input | 0) === input) && input < 256) {
            // @ts-ignore
            input = [input];
        }
        else {
            // @ts-ignore
            input = Array.from(Buffer.from(util_1._numHex(input), 'hex'));
        }
    }
    else if (ti === 'string') {
        // @ts-ignore
        input = Array.from(Buffer.from(input));
    }
    else if (is_array || (deep < 1 && input[Symbol.iterator])) {
        if (!Array.isArray(input)) {
            // @ts-ignore
            input = util_1.arrayFromIterator(input);
        }
        // @ts-ignore
        input = Array.from(input)
            .reduce(function (a, v) {
            let tv = typeof v;
            // @ts-ignore
            if ((tv === 'bigint' || tv === 'number') && v === (v | 0)) {
                v = Number(v);
                // @ts-ignore
                a.push(v);
            }
            else {
                //console.log(v);
                v = Array.from(handleSeed(v, undefined, (deep | 0) + 1));
                // @ts-ignore
                a.push(...v);
            }
            return a;
        }, []);
    }
    else {
        // @ts-ignore
        input = String(input);
        let i = input.length;
        let arr = [];
        while (i--) {
            arr[i] = input[i].codePointAt(0) | 0;
        }
        // @ts-ignore
        input = arr;
    }
    if (!deep && !input.length) {
        // @ts-ignore
        input = seedFromUnsafeBuffer();
    }
    if (typeof mixinArray !== 'undefined') {
        // @ts-ignore
        input = mixinSeed(input, mixinArray);
    }
    else {
        // @ts-ignore
        input = _arrayPadEntries(input, input.length || util_1.ARC4_LENGTH);
    }
    // @ts-ignore
    return input;
}
exports.handleSeed = handleSeed;
/**
 * clone current input and fill to fixed length (ARC4_LENGTH = 256)
 */
function arrayPadEntries(buf) {
    // @ts-ignore
    return _arrayPadEntries(buf, util_1.ARC4_LENGTH);
}
exports.arrayPadEntries = arrayPadEntries;
function _arrayPadEntries(buf, targetLength = util_1.ARC4_LENGTH) {
    let len = buf.length;
    if (len < targetLength) {
        if (Buffer.isBuffer(buf)) {
            let buf2 = Buffer.allocUnsafe(targetLength);
            buf.copy(buf2);
            // @ts-ignore
            buf = buf2;
        }
        else {
            // @ts-ignore
            buf = buf.concat(util_1.createArray(targetLength - len, (v, i) => len + i));
        }
    }
    else if (len > targetLength) {
        // @ts-ignore
        buf = buf.slice(0, targetLength);
    }
    if (Buffer.isBuffer(buf)) {
        // @ts-ignore
        buf = Buffer.from(buf);
    }
    // @ts-ignore
    return buf;
}
exports._arrayPadEntries = _arrayPadEntries;
Object.freeze(exports);
