import express, { response } from "express";

import {QuerySearch, IdSearch, getpageMovies} from '../controller/movieController';

const router =express.Router();

export default function getRouter(){
    router
        .route('/movies/containing/:name')
        .get(async(req, res)=>{
            await QuerySearch(req, res);
        })


    router
        .route('/movies')
        .get(async(req, res)=>{
          await getpageMovies(req, res)
        })

    router
        .route('/movie/:id')
        .get(async(req, res)=>{
            console.log("yes")
          await IdSearch(req, res);

        })
      return router;  
}
