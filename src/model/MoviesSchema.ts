import mongoose from "mongoose";

const movieSchema = new mongoose.Schema({
  Title : {
    type : String,
  },
  Year : {
      type : String
  },
  Released : {
      type : String
  },
  Runtime : {
      type : String
  },
  Genre : {
    type : String
  },
  Director : {
    type : String
    },
  Writer : {
    type : String
},
  Actors : {
    type : String
    },
  Plot : {
    type : String
    },
  Language : {
    type : String
    },
  Awards : {
    type : String
    },
  imdbRating : {
    type : String
    },
  imdbID : {
    type : String,
    unique : true
    },
  Poster : {
    type : String
    },
},{collection : "movieData", timestamps:true})


export default mongoose.model("movieData", movieSchema);