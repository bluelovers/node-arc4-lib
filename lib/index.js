Object.defineProperty(exports, "__esModule", {
    value: !0
});

const chai_1 = require("chai"), seed_1 = require("./seed");

exports.handleSeed = seed_1.handleSeed, exports.mixinSeed = seed_1.mixinSeed, exports.seedFromUnsafeBuffer = seed_1.seedFromUnsafeBuffer;

const util_1 = require("./util");

function ARC4(e, r, t) {
    e && util_1.isOptions(e) ? (t = util_1.handleOptions(e), e = t.seedArray, r = t.mixinArray || r) : util_1.isOptions(r) && (t = util_1.handleOptions(r), 
    e = t.seedArray || e, r = t.mixinArray), t = util_1.handleOptions(t), void 0 === r && (r = null);
    const i = seed_1.handleSeed(e, r);
    let n = arc4mixin(seed_1.arrayPadEntries(i)), o = arc4Generator(n, t.loop), l = {
        get seed() {
            return e;
        },
        next: () => o.next(),
        get _seed() {
            return i;
        },
        get state() {
            return n;
        },
        [Symbol.iterator]: () => arc4Generator(n)
    };
    if (!t.loop) {
        let e = [], r = 0;
        for (let t of o) e[r++] = t;
        o = e[Symbol.iterator](), l[Symbol.iterator] = function*() {
            yield* o = e[Symbol.iterator]();
        };
    }
    return r = t = null, l;
}

function arc4mixin(e) {
    let r = seed_1.arrayPadEntries(e), t = util_1.ARC4_LENGTH;
    for (;t--; ) r[t] = t;
    t = util_1.ARC4_LENGTH;
    let i = e.length, n = 0, o = 0;
    for (;t--; ) {
        o = (o + r[n] + e[n % i]) % util_1.ARC4_LENGTH;
        let t = r[n];
        r[n] = r[o], r[o] = t, n++;
    }
    return r;
}

function* arc4Generator(e, r) {
    let t, i;
    chai_1.expect(e).lengthOf.gt(0);
    let n = 0, o = 0, l = e.length;
    if (r) for (;;) o = (o + e[n = (n + 1) % l]) % l, i = e[n], e[n] = e[o], e[o] = i, 
    yield e[t = (e[n] + e[o]) % l]; else {
        let r = l;
        for (;r--; ) o = (o + e[n = (n + 1) % l]) % l, i = e[n], e[n] = e[o], e[o] = i, 
        yield e[t = (e[n] + e[o]) % l];
    }
}

exports.ARC4_LENGTH = util_1.ARC4_LENGTH, exports.default = ARC4, exports.ARC4 = ARC4, 
exports.arc4mixin = arc4mixin, exports.arc4Generator = arc4Generator, Object.freeze(exports);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIjAiXSwibmFtZXMiOlsiT2JqZWN0IiwiZGVmaW5lUHJvcGVydHkiLCJleHBvcnRzIiwidmFsdWUiLCJjaGFpXzEiLCJyZXF1aXJlIiwic2VlZF8xIiwiaGFuZGxlU2VlZCIsIm1peGluU2VlZCIsInNlZWRGcm9tVW5zYWZlQnVmZmVyIiwidXRpbF8xIiwiQVJDNCIsInNlZWRBcnJheSIsIm1peGluQXJyYXkiLCJvcHRzIiwiaXNPcHRpb25zIiwiaGFuZGxlT3B0aW9ucyIsInNlZWQiLCJzZWVkbWl4aW4iLCJhcmM0bWl4aW4iLCJhcnJheVBhZEVudHJpZXMiLCJpdGVyYXRvciIsImFyYzRHZW5lcmF0b3IiLCJsb29wIiwiYmFzZSIsIm5leHQiLCJfc2VlZCIsInN0YXRlIiwiW29iamVjdCBPYmplY3RdIiwiU3ltYm9sIiwiYXJyIiwiaSIsInYiLCJidWYiLCJsaW1pdCIsIkFSQzRfTEVOR1RIIiwic2VlZExlbmd0aCIsImxlbmd0aCIsImoiLCJzd2FwIiwiaW5kZXgiLCJleHBlY3QiLCJsZW5ndGhPZiIsImd0IiwibGVuIiwiZGVmYXVsdCIsImZyZWV6ZSJdLCJtYXBwaW5ncyI6IkFBR0FBLE9BQU9DLGVBQWVDLFNBQVM7SUFBZ0JDLFFBQU87OztBQUN0RCxNQUFNQyxTQUFTQyxRQUFRLFNBQ2pCQyxTQUFTRCxRQUFROztBQUN2QkgsUUFBUUssYUFBYUQsT0FBT0MsWUFDNUJMLFFBQVFNLFlBQVlGLE9BQU9FLFdBQzNCTixRQUFRTyx1QkFBdUJILE9BQU9HOztBQUN0QyxNQUFNQyxTQUFTTCxRQUFROztBQUd2QixTQUFTTSxLQUFLQyxHQUFXQyxHQUFZQztJQUU3QkYsS0FBYUYsT0FBT0ssVUFBVUgsTUFFOUJFLElBQU9KLE9BQU9NLGNBQWNKLElBRTVCQSxJQUFZRSxFQUFLRixXQUNqQkMsSUFBYUMsRUFBS0QsY0FBY0EsS0FFM0JILE9BQU9LLFVBQVVGLE9BQ3RCQyxJQUFPSixPQUFPTSxjQUFjSDtJQUU1QkQsSUFBWUUsRUFBS0YsYUFBYUEsR0FDOUJDLElBQWFDLEVBQUtELGFBRXRCQyxJQUFPSixPQUFPTSxjQUFjRixTQUNGLE1BQWZELE1BQ1BBLElBQWE7SUFHakIsTUFBTUksSUFBT1gsT0FBT0MsV0FBV0ssR0FBV0M7SUFDMUMsSUFBSUssSUFBWUMsVUFBVWIsT0FBT2MsZ0JBQWdCSCxLQUM3Q0ksSUFBV0MsY0FBY0osR0FBV0osRUFBS1MsT0FHekNDO1FBQ0FQO1lBRUksT0FBT0w7O1FBRVhhLE1BQUksTUFDT0osRUFBU0k7UUFFcEJDO1lBQ0ksT0FBT1Q7O1FBRVhVO1lBQ0ksT0FBT1Q7O1FBRVhVLENBQUNDLE9BQU9SLFdBQVMsTUFDTkMsY0FBY0o7O0lBRzdCLEtBQUtKLEVBQUtTLE1BQU07UUFDWixJQUFJTyxRQUNBQyxJQUFJO1FBQ1IsS0FBSyxJQUFJQyxLQUFLWCxHQUNWUyxFQUFJQyxPQUFPQztRQUVmWCxJQUFXUyxFQUFJRCxPQUFPUixhQUN0QkcsRUFBS0ssT0FBT1IsWUFBWTttQkFDcEJBLElBQVdTLEVBQUlELE9BQU9SOzs7SUFLOUIsT0FEQVIsSUFBYUMsSUFBTyxNQUNiVTs7O0FBR1gsU0FBU0wsVUFBVVA7SUFDZixJQUFJcUIsSUFBTTNCLE9BQU9jLGdCQUFnQlIsSUFDN0JzQixJQUFReEIsT0FBT3lCO0lBS25CLE1BQU9ELE9BRUhELEVBQUlDLEtBQVNBO0lBRWpCQSxJQUFReEIsT0FBT3lCO0lBR2YsSUFBSUMsSUFBYXhCLEVBQVV5QixRQUN2Qk4sSUFBSSxHQUNKTyxJQUFJO0lBQ1IsTUFBT0osT0FBUztRQUNaSSxLQUFLQSxJQUFJTCxFQUFJRixLQUFLbkIsRUFBVW1CLElBQUlLLE1BQWUxQixPQUFPeUI7UUFDdEQsSUFBSUksSUFBT04sRUFBSUY7UUFDZkUsRUFBSUYsS0FBS0UsRUFBSUssSUFDYkwsRUFBSUssS0FBS0MsR0FDVFI7O0lBRUosT0FBT0U7OztBQUdYLFVBQVVYLGNBQWNXLEdBQUtWO0lBRXpCLElBQUlpQixHQUFPRDtJQURYbkMsT0FBT3FDLE9BQU9SLEdBQUtTLFNBQVNDLEdBQUc7SUFFL0IsSUFBSVosSUFBSSxHQUNKTyxJQUFJLEdBQ0pNLElBQU1YLEVBQUlJO0lBQ2QsSUFBSWQsR0FDQSxTQUVJZSxLQUFLQSxJQUFJTCxFQURURixLQUFLQSxJQUFJLEtBQUthLE1BQ0tBLEdBQ25CTCxJQUFPTixFQUFJRixJQUNYRSxFQUFJRixLQUFLRSxFQUFJSyxJQUNiTCxFQUFJSyxLQUFLQztVQUVITixFQUROTyxLQUFTUCxFQUFJRixLQUFLRSxFQUFJSyxNQUFNTSxTQUkvQjtRQUNELElBQUlWLElBQVFVO1FBQ1osTUFBT1YsT0FFSEksS0FBS0EsSUFBSUwsRUFEVEYsS0FBS0EsSUFBSSxLQUFLYSxNQUNLQSxHQUNuQkwsSUFBT04sRUFBSUYsSUFDWEUsRUFBSUYsS0FBS0UsRUFBSUssSUFDYkwsRUFBSUssS0FBS0M7Y0FFSE4sRUFETk8sS0FBU1AsRUFBSUYsS0FBS0UsRUFBSUssTUFBTU07Ozs7QUFqSHhDMUMsUUFBUWlDLGNBQWN6QixPQUFPeUIsYUFDN0JqQyxRQUFRMkMsVUFBVWxDLE1BMkRsQlQsUUFBUVMsT0FBT0E7QUEyQmZULFFBQVFpQixZQUFZQSxXQStCcEJqQixRQUFRb0IsZ0JBQWdCQSxlQUN4QnRCLE9BQU84QyxPQUFPNUMifQ==