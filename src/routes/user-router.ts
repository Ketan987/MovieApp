import express, { response } from "express";
// import book from "../model/book";
// import {answer, posts, user} from '../model/schemas'
import {register, login} from '../controller/user-controller';
const router =express.Router();

export default function getRouter(){
    // register
    router
        .route('/register')
        .post(async(req, res)=>{
            // console.log(req.body.email, req.body.password);
            await register(req, res);
        })


    
    // login
    router
        .route('/login')
        .post(async(req, res)=>{
           await login(req, res);
        })


    


  


    

    // User ANswers
    


      return router;  
}


