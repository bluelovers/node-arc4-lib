/**
 * Created by user on 2018/12/1/001.
 */
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
const ARC4Lib = require("./lib");
exports.ARC4Lib = ARC4Lib;
__export(require("./lib"));
const lib_1 = require("./lib");
exports.ARC4 = lib_1.ARC4;
exports.default = ARC4Lib;
