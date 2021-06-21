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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getpageMovies = exports.IdSearch = exports.QuerySearch = void 0;
var axios_1 = __importDefault(require("axios"));
var MoviesSchema_1 = __importDefault(require("../model/MoviesSchema"));
function presentinlocal(id) {
    return __awaiter(this, void 0, void 0, function () {
        var found, err_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, MoviesSchema_1.default.findOne({ imdbID: id })];
                case 1:
                    found = _a.sent();
                    return [2 /*return*/, found];
                case 2:
                    err_1 = _a.sent();
                    return [2 /*return*/, "err"];
                case 3: return [2 /*return*/];
            }
        });
    });
}
var QuerySearch = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var output, err_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, axios_1.default({
                        method: "GET",
                        url: "http://www.omdbapi.com/?apikey=c6a23ed0&s=" + req.params.name,
                    })];
            case 1:
                output = _a.sent();
                output.data.Search.map(function (out) { return __awaiter(void 0, void 0, void 0, function () {
                    var present, moviebyid, movie;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, presentinlocal(out.imdbID)];
                            case 1:
                                present = _a.sent();
                                if (!(present === undefined || present === null)) return [3 /*break*/, 4];
                                return [4 /*yield*/, axios_1.default({
                                        method: "GET",
                                        url: "http://www.omdbapi.com/?apikey=c6a23ed0&i=" + out.imdbID,
                                    })];
                            case 2:
                                moviebyid = _a.sent();
                                movie = new MoviesSchema_1.default(moviebyid.data);
                                return [4 /*yield*/, movie.save()];
                            case 3:
                                _a.sent();
                                // console.log(moviebyid.data)
                                console.log('storing in db ', out.imdbID);
                                return [3 /*break*/, 5];
                            case 4:
                                console.log('present iin db ', out.imdbID);
                                _a.label = 5;
                            case 5: return [2 /*return*/];
                        }
                    });
                }); });
                res.json(output.data);
                return [3 /*break*/, 3];
            case 2:
                err_2 = _a.sent();
                res.json({
                    messgae: "failed",
                    status: "failed " + err_2.message
                });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.QuerySearch = QuerySearch;
var IdSearch = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var present, output, movie, err_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 6, , 7]);
                return [4 /*yield*/, presentinlocal(req.params.id)];
            case 1:
                present = _a.sent();
                if (!(present === undefined || present === null)) return [3 /*break*/, 4];
                return [4 /*yield*/, axios_1.default({
                        method: "GET",
                        url: "http://www.omdbapi.com/?apikey=c6a23ed0&i=" + req.params.id,
                    })];
            case 2:
                output = _a.sent();
                movie = new MoviesSchema_1.default(output.data);
                return [4 /*yield*/, movie.save()];
            case 3:
                _a.sent();
                res.json({
                    movie: movie
                });
                return [3 /*break*/, 5];
            case 4:
                if (present !== "err") {
                    res.json({
                        present: present
                    });
                }
                _a.label = 5;
            case 5: return [3 /*break*/, 7];
            case 6:
                err_3 = _a.sent();
                res.json({
                    messgae: "failed",
                    status: "failed" + err_3.message
                });
                return [3 /*break*/, 7];
            case 7: return [2 /*return*/];
        }
    });
}); };
exports.IdSearch = IdSearch;
var getpageMovies = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var queries, output, err_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                console.log('here');
                queries = req.query;
                console.log(req.query);
                return [4 /*yield*/, axios_1.default({
                        method: "GET",
                        url: "http://www.omdbapi.com/?apikey=c6a23ed0&s=batman&page=" + +queries.page
                    })
                    // var out;
                    // if(queries.pageSize){
                    //     out = output.data.slice(0, +req.queries.pageSize)
                    // }
                    // else{
                    //     out = output.data.slice(0, 10)
                    // }
                ];
            case 1:
                output = _a.sent();
                // var out;
                // if(queries.pageSize){
                //     out = output.data.slice(0, +req.queries.pageSize)
                // }
                // else{
                //     out = output.data.slice(0, 10)
                // }
                res.json(output.data);
                return [3 /*break*/, 3];
            case 2:
                err_4 = _a.sent();
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.getpageMovies = getpageMovies;
