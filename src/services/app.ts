import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import env from "dotenv";
import userRouter from '../routes/user-router';
import MoviesRouter from '../routes/moviRouter';
const path = __dirname + "/build";
// import questionRouter from '../routes/question-router';


const configureEvironment=()=>{
    env.config();

}

async function connectToDb() {
    const connStr = `mongodb+srv://KetanUser:${process.env.DB_PASS}@clustermern.qtl6k.mongodb.net/${process.env.DB_DATABASE}?retryWrites=true&w=majority`;
    console.log("Initializing  database connection");
    await mongoose.connect(connStr, { useNewUrlParser: true, useUnifiedTopology: true, });
    console.log("database connection established");
}
function configureExpress() {
    const app = express();
    app.use(cors());
    app.use(express.json());
    app.use('/api',userRouter());
    app.use('/api',MoviesRouter())
    app.use(express.static(path))
    app.get('/*', (req, res)=>{
        res.sendFile(path + "/index.html")
    })
    return app;
}

const startServer = async () => {
    configureEvironment()
    await connectToDb();
    const app = configureExpress();
    const server = app.listen(process.env.PORT);
    server.on("error", (error: any) => {
        console.log("server error", error.message);
    });
}

startServer()
.then(()=>{console.log('server started on port',process.env.PORT)})
.catch((error:any)=>{console.log("error starting server",error.message)})
