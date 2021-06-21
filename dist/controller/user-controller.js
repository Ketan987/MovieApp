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
exports.login = exports.register = void 0;
var userSchema_1 = __importDefault(require("../model/userSchema"));
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var bcrypt_1 = __importDefault(require("bcrypt"));
var finduser = function (email) { return __awaiter(void 0, void 0, void 0, function () {
    var found, _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 2, , 3]);
                return [4 /*yield*/, userSchema_1.default.findOne({ email: email })
                    // console.log(found);
                ];
            case 1:
                found = _b.sent();
                // console.log(found);
                return [2 /*return*/, found];
            case 2:
                _a = _b.sent();
                console.log('Wrongs');
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
var register = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var email, password_1, _a, err_1;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 4, , 5]);
                email = req.body.email;
                password_1 = req.body.password;
                return [4 /*yield*/, finduser(email)];
            case 1:
                _a = (_b.sent()) === undefined;
                if (_a) return [3 /*break*/, 3];
                return [4 /*yield*/, finduser(email)];
            case 2:
                _a = (_b.sent()) === null;
                _b.label = 3;
            case 3:
                if (_a) {
                    bcrypt_1.default.hash(password_1, 10)
                        .then(function (hash) { return __awaiter(void 0, void 0, void 0, function () {
                        var use;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    password_1 = hash;
                                    use = new userSchema_1.default({ email: req.body.email, password: password_1, username: req.body.username, image: req.body.image });
                                    return [4 /*yield*/, use.save()];
                                case 1:
                                    _a.sent();
                                    res.json({
                                        message: 'created',
                                        status: "User Created Succesfully",
                                        data: use
                                    });
                                    return [2 /*return*/];
                            }
                        });
                    }); })
                        .catch(function (err) {
                        res.json({
                            message: 'failed',
                            status: err.message
                        });
                    });
                }
                else {
                    res.json({
                        message: 'failed',
                        status: "Email Problem"
                    });
                }
                return [3 /*break*/, 5];
            case 4:
                err_1 = _b.sent();
                res.json({
                    messgae: "failed",
                    status: "failed " + err_1.message
                });
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); };
exports.register = register;
var login = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, email, password, userData, match, token, err_2;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 2, , 3]);
                _a = req.body, email = _a.email, password = _a.password;
                return [4 /*yield*/, finduser(email)];
            case 1:
                userData = _b.sent();
                if (userData !== undefined) {
                    match = bcrypt_1.default.compare(password, userData === null || userData === void 0 ? void 0 : userData.password);
                    if (match) {
                        token = jsonwebtoken_1.default.sign({ email: email }, 'pangong', { expiresIn: '2D' });
                        res.status(200).json({
                            message: 'succesful',
                            status: userData,
                            token: token
                        });
                    }
                    else {
                        res.json({
                            message: 'failed',
                            status: 'Invalid Password'
                        });
                    }
                }
                else {
                    res.json({
                        message: "failed",
                        status: "User Not FOund"
                    });
                }
                return [3 /*break*/, 3];
            case 2:
                err_2 = _b.sent();
                res.json({
                    messgae: "failed",
                    status: "failed" + err_2.message
                });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.login = login;
