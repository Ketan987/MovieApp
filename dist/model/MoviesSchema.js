"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importDefault(require("mongoose"));
var movieSchema = new mongoose_1.default.Schema({
    Title: {
        type: String,
    },
    Year: {
        type: String
    },
    Released: {
        type: String
    },
    Runtime: {
        type: String
    },
    Genre: {
        type: String
    },
    Director: {
        type: String
    },
    Writer: {
        type: String
    },
    Actors: {
        type: String
    },
    Plot: {
        type: String
    },
    Language: {
        type: String
    },
    Awards: {
        type: String
    },
    imdbRating: {
        type: String
    },
    imdbID: {
        type: String,
        unique: true
    },
    Poster: {
        type: String
    },
}, { collection: "movieData", timestamps: true });
exports.default = mongoose_1.default.model("movieData", movieSchema);
