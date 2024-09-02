"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Module = void 0;
var node_html_markdown_1 = require("node-html-markdown");
var node_fs_1 = __importDefault(require("node:fs"));
var packageInfo = require('../package.json');
var Module = /** @class */ (function () {
    function Module() {
    }
    Module.prototype.onInit = function (config, eventBus) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this.eventBus = eventBus;
                this.sourceDirectory = config.sourceDirectory;
                return [2 /*return*/];
            });
        });
    };
    Module.prototype.run = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                this.eventBus.on('set_url', function (url) { return __awaiter(_this, void 0, void 0, function () {
                    var response, html, regTitle, title, xxhtml, content;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, fetch(url)];
                            case 1:
                                response = _a.sent();
                                return [4 /*yield*/, response.text()];
                            case 2:
                                html = _a.sent();
                                regTitle = html.match(/<title>.*?<\/title>/);
                                title = regTitle === null || regTitle === void 0 ? void 0 : regTitle[0].replace(/<*.title>/g, '');
                                html = html.replace(/code class=".*?"/g, 'code class="language-typescript"');
                                return [4 /*yield*/, this.replaceAsync(html, / src=".*?"/gi, this.imageUrlToBase64)];
                            case 3:
                                xxhtml = _a.sent();
                                content = node_html_markdown_1.NodeHtmlMarkdown.translate(xxhtml, { keepDataImages: true });
                                if (node_fs_1.default.existsSync(this.sourceDirectory)) {
                                    node_fs_1.default.writeFileSync("".concat(this.sourceDirectory, "/").concat(title, ".md"), content);
                                    this.eventBus.emit('writeFileComplete');
                                }
                                return [2 /*return*/];
                        }
                    });
                }); });
                return [2 /*return*/];
            });
        });
    };
    Module.prototype.info = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, Promise.resolve({ name: packageInfo.name, version: packageInfo.version })];
            });
        });
    };
    Module.prototype.onDestroy = function () {
        return __awaiter(this, void 0, void 0, function () { return __generator(this, function (_a) {
            return [2 /*return*/];
        }); });
    };
    Module.prototype.replaceAsync = function (str, regex, asyncFn) {
        return __awaiter(this, void 0, void 0, function () {
            var promises, data;
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        promises = [];
                        str.replace(regex, function (full) {
                            var args = [];
                            for (var _i = 1; _i < arguments.length; _i++) {
                                args[_i - 1] = arguments[_i];
                            }
                            //@ts-ignore
                            promises.push(asyncFn.apply(void 0, __spreadArray([full], args, false)));
                            return full;
                        });
                        return [4 /*yield*/, Promise.all(promises)];
                    case 1:
                        data = (_a = _b.sent()) !== null && _a !== void 0 ? _a : [];
                        //@ts-ignore
                        return [2 /*return*/, str.replace(regex, function () { return data.shift(); })];
                }
            });
        });
    };
    Module.prototype.imageUrlToBase64 = function (url) {
        return __awaiter(this, void 0, void 0, function () {
            var response, blob, contentType, buffer, b64String, base64String, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        url = url.replace(/ src="/, '').replace(/"/, '');
                        if (!url.startsWith('http')) {
                            return [2 /*return*/, Promise.resolve('')];
                        }
                        return [4 /*yield*/, fetch(url)];
                    case 1:
                        response = _a.sent();
                        return [4 /*yield*/, response.arrayBuffer()];
                    case 2:
                        blob = _a.sent();
                        contentType = response.headers.get('content-type');
                        buffer = Buffer.from(blob);
                        b64String = buffer.toString('base64');
                        base64String = "data:".concat(contentType, ";base64,").concat(b64String);
                        return [2 /*return*/, Promise.resolve(" src=\"".concat(base64String, "\""))];
                    case 3:
                        err_1 = _a.sent();
                        console.log(err_1);
                        return [2 /*return*/, Promise.reject(err_1)];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    return Module;
}());
exports.Module = Module;
