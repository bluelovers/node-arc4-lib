Object.defineProperty(exports, "__esModule", {
    value: !0
});

const chai_1 = require("chai"), seed_1 = require("./seed");

exports.handleSeed = seed_1.handleSeed, exports.mixinSeed = seed_1.mixinSeed, exports.seedFromUnsafeBuffer = seed_1.seedFromUnsafeBuffer;

const util_1 = require("./util");

function ARC4(e, t, r) {
    let i, n;
    e && util_1.isOptions(e) ? (r = util_1.handleOptions(e), e = r.seedArray, t = r.mixinArray || t) : util_1.isOptions(t) ? (r = util_1.handleOptions(t), 
    e = r.seedArray || e, t = r.mixinArray) : (r = util_1.handleOptions(r), e = e || r.seedArray, 
    t = t || r.mixinArray), r = util_1.handleOptions(r), void 0 === t && (t = null), 
    r.s ? (i = r.s, e = t = null) : (n = seed_1.handleSeed(e, t), i = arc4mixin(n));
    const l = !!r.loop;
    let {i: o, j: a} = r, s = arc4Generator(i, r.loop, o, a), d = {
        get argvSeed() {
            return e;
        },
        get argvMixin() {
            return t;
        },
        next() {
            let e = s.next().value;
            return ({i: o, j: a} = e), e.v;
        },
        transform(e) {
            let t = d[Symbol.iterator]();
            return e.map(e => {
                let r = t.next();
                return r.done && (r = (t = d[Symbol.iterator]()).next()), e ^ r.value;
            });
        },
        get _seed() {
            return n;
        },
        get state() {
            return {
                i: o,
                j: a,
                s: i
            };
        },
        * [Symbol.iterator]() {
            let e = arc4Generator(i, !1, o, a);
            for (let t of e) ({i: o, j: a} = t), yield t.v;
        },
        toJSON: () => ({
            argvSeed: d.argvSeed,
            argvMixin: d.argvMixin,
            _seed: d._seed,
            state: d.state
        })
    };
    if (r.state || Object.defineProperties(d, {
        argvSeed: {
            get() {}
        },
        argvMixin: {
            get() {}
        },
        _seed: {
            get() {}
        },
        state: {
            get() {}
        }
    }), !r.loop) {
        let e = [], t = 0;
        for (let r of s) e[t++] = r;
        s = e[Symbol.iterator](), d[Symbol.iterator] = function*() {
            s = e[Symbol.iterator]();
            for (let e of s) yield e.v;
        }, r.state ? d.next = (() => {
            let r = s.next();
            return r.done && (r = (s = e[Symbol.iterator]()).next()), ({i: t, j: a} = r.value), 
            r.value.v;
        }) : d.next = (() => {
            let t = s.next();
            return t.done && (t = (s = e[Symbol.iterator]()).next()), t.value.v;
        });
    }
    return t = r = null, d;
}

function arc4mixin(e) {
    let t = seed_1.arrayPadEntries(e), r = util_1.ARC4_LENGTH;
    for (;r--; ) t[r] = r;
    r = util_1.ARC4_LENGTH;
    let i = e.length, n = 0, l = 0, o = n;
    for (r = Math.max(i, r); r--; ) {
        l = (l + t[o = n % util_1.ARC4_LENGTH] + e[n % i]) % util_1.ARC4_LENGTH;
        let r = t[o];
        t[o] = t[l], t[l] = r, n++;
    }
    return t;
}

function* arc4Generator(e, t, r = 0, i = 0) {
    let n, l;
    chai_1.expect(e).lengthOf.gt(0), chai_1.expect(r).gte(0), chai_1.expect(i).gte(0);
    let o = e.length;
    if (t) for (;;) i = (i + e[r = (r + 1) % o]) % o, l = e[r], e[r] = e[i], e[i] = l, 
    yield {
        v: e[n = (e[r] + e[i]) % o],
        i: r,
        j: i
    }; else {
        let t = o;
        for (;t--; ) i = (i + e[r = (r + 1) % o]) % o, l = e[r], e[r] = e[i], e[i] = l, 
        yield {
            v: e[n = (e[r] + e[i]) % o],
            i: r,
            j: i
        };
    }
}

exports.ARC4_LENGTH = util_1.ARC4_LENGTH, exports.default = ARC4, exports.ARC4 = ARC4, 
exports.arc4mixin = arc4mixin, exports.arc4Generator = arc4Generator, Object.freeze(exports);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIjAiXSwibmFtZXMiOlsiT2JqZWN0IiwiZGVmaW5lUHJvcGVydHkiLCJleHBvcnRzIiwidmFsdWUiLCJjaGFpXzEiLCJyZXF1aXJlIiwic2VlZF8xIiwiaGFuZGxlU2VlZCIsIm1peGluU2VlZCIsInNlZWRGcm9tVW5zYWZlQnVmZmVyIiwidXRpbF8xIiwiQVJDNCIsInNlZWRBcnJheSIsIm1peGluQXJyYXkiLCJvcHRzIiwic2VlZG1peGluIiwic2VlZCIsImlzT3B0aW9ucyIsImhhbmRsZU9wdGlvbnMiLCJzIiwiYXJjNG1peGluIiwibG9vcCIsImkiLCJqIiwiaXRlcmF0b3IiLCJhcmM0R2VuZXJhdG9yIiwiYmFzZSIsImFyZ3ZTZWVkIiwiYXJndk1peGluIiwiW29iamVjdCBPYmplY3RdIiwiciIsIm5leHQiLCJ2IiwiYnVmIiwiZm4iLCJTeW1ib2wiLCJtYXAiLCJkb25lIiwiX3NlZWQiLCJzdGF0ZSIsInRvSlNPTiIsImRlZmluZVByb3BlcnRpZXMiLCJhcnIiLCJhcnJheVBhZEVudHJpZXMiLCJsaW1pdCIsIkFSQzRfTEVOR1RIIiwic2VlZExlbmd0aCIsImxlbmd0aCIsImsiLCJNYXRoIiwibWF4Iiwic3dhcCIsImluZGV4IiwiZXhwZWN0IiwibGVuZ3RoT2YiLCJndCIsImd0ZSIsImxlbiIsImRlZmF1bHQiLCJmcmVlemUiXSwibWFwcGluZ3MiOiJBQUdBQSxPQUFPQyxlQUFlQyxTQUFTO0lBQWdCQyxRQUFPOzs7QUFDdEQsTUFBTUMsU0FBU0MsUUFBUSxTQUNqQkMsU0FBU0QsUUFBUTs7QUFDdkJILFFBQVFLLGFBQWFELE9BQU9DLFlBQzVCTCxRQUFRTSxZQUFZRixPQUFPRSxXQUMzQk4sUUFBUU8sdUJBQXVCSCxPQUFPRzs7QUFDdEMsTUFBTUMsU0FBU0wsUUFBUTs7QUFHdkIsU0FBU00sS0FBS0MsR0FBV0MsR0FBWUM7SUF5QmpDLElBQUlDLEdBQ0FDO0lBeEJBSixLQUFhRixPQUFPTyxVQUFVTCxNQUU5QkUsSUFBT0osT0FBT1EsY0FBY04s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