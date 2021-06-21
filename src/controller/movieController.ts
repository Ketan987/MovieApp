import axios from 'axios';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import  Movie from '../model/MoviesSchema';

async function presentinlocal(id:string) {
    try{
        let found = await Movie.findOne({imdbID : id})
        return found
    }
    catch(err){
        return "err"
    }
}


const QuerySearch = async(req:any, res:any) => {
    try{
        let output = await axios({
            method : "GET",
            url : "http://www.omdbapi.com/?apikey=c6a23ed0&s="+req.params.name,
        })
        output.data.Search.map(async(out:any)=>{
            const present = await presentinlocal(out.imdbID);
            if(present === undefined || present === null){
                const moviebyid = await axios({
                    method : "GET",
                    url : "http://www.omdbapi.com/?apikey=c6a23ed0&i="+out.imdbID,
                })
                let movie = new Movie(moviebyid.data);
                await movie.save();
                // console.log(moviebyid.data)
                console.log('storing in db ', out.imdbID)
            }
            else{
                console.log('present iin db ', out.imdbID)
                // await Movie.create(present);
            }
        })
        res.json(output.data);
    }
    catch(err:any){
        res.json({
            messgae : "failed",
            status : "failed " + err.message
        })
    }
}



const IdSearch = async(req:any, res:any)=>{
    try{
        const present = await presentinlocal(req.params.id)
        if( present === undefined || present === null){
            let output = await axios({
                method : "GET",
                url : "http://www.omdbapi.com/?apikey=c6a23ed0&i="+req.params.id,
            })

            let movie = new Movie(output.data);
            await movie.save();
            res.json({
                movie
            })
        }
        else if(present !== "err"){
            res.json({
                present
            })
        }
    }
    catch(err:any){
        res.json({
            messgae : "failed",
            status : "failed" + err.message
        })
    }
}


const getpageMovies = async(req:any, res:any) => {
    try{
        console.log('here')
        const queries = req.query;
        console.log(req.query)
        let output = await axios({
            method : "GET",
            url : "http://www.omdbapi.com/?apikey=c6a23ed0&s=batman&page="+ +queries.page
        })

        // var out;
        // if(queries.pageSize){
        //     out = output.data.slice(0, +req.queries.pageSize)
        // }
        // else{
        //     out = output.data.slice(0, 10)
        // }

        res.json(output.data)
    }
    catch(err) {

    }
}


export {
    QuerySearch,
    IdSearch,
    getpageMovies
}


