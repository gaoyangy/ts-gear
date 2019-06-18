"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var _this = this;
exports.__esModule = true;
var fetch = require("isomorphic-fetch");
var log_1 = require("./log");
/**
 * 按url是否以http开头
 * 调用fetch，或直接require本地文件
 * 远程接口的swagger如果有验证限制不能直接访问，
 * 自己copy成json文件本地加载最方便
 * 如果需要自动化，参照fetch文档 https://developer.mozilla.org/zh-CN/docs/Web/API/Fetch_API/Using_Fetch
 * 在配置文件的fetchOption按RequestInit接口格式添加验证参数
 * */
exports.fetchSwaggerJSONSchema = function (url, init) { return __awaiter(_this, void 0, void 0, function () {
    var res, text;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (!url.startsWith('http')) return [3 /*break*/, 3];
                log_1.info("start fetching " + url);
                return [4 /*yield*/, fetch(url, init)];
            case 1:
                res = _a.sent();
                return [4 /*yield*/, res.text()];
            case 2:
                text = _a.sent();
                log_1.info("fetching " + url + " done");
                // info(JSON.stringify(init))
                try {
                    return [2 /*return*/, JSON.parse(text)];
                }
                catch (_b) {
                    log_1.error(text);
                    // 有可能由于单引号，json校验失败不能解析
                    // 如果还是出错就throw出来吧
                    return [2 /*return*/, eval("(" + text + ")")];
                }
                _a.label = 3;
            case 3:
                // json文件直接require
                if (!url.endsWith('.json')) {
                    log_1.error('user config file should ends with `.json`');
                }
                return [2 /*return*/, require(url)];
        }
    });
}); };
// fetchSwaggerJSONSchema('aaa')