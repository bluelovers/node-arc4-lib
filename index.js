/**
 * Created by user on 2018/12/1/001.
 */
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
const ARC4Lib = require("./lib");
__export(require("./lib"));
var lib_1 = require("./lib");
exports.ARC4 = lib_1.ARC4;
exports.default = ARC4Lib;
