import user from '../model/userSchema';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

const finduser = async(email:string)=>{
    try{
        let found = await user.findOne({email})
        // console.log(found);
        return found
    }
    catch{
        console.log('Wrongs');
    }
}

const register = async(req:any, res:any) => {
    try{
        let email = req.body.email;
        let password = req.body.password;
        if(await finduser(email) === undefined || await finduser(email) === null){
            bcrypt.hash(password, 10)
            .then(async(hash)=>{
                password = hash
                let use = new user({email : req.body.email, password, username : req.body.username, image : req.body.image});
                await use.save();
                res.json({
                    message : 'created',
                    status : "User Created Succesfully",
                    data : use
                })

            })
            .catch(err =>{
                res.json({
                    message : 'failed',
                    status : err.message
                })
            })
        }
        else{
            res.json({
                message : 'failed',
                status : "Email Problem"
            })   
        }
    }
    catch(err:any){
        res.json({
            messgae : "failed",
            status : "failed " + err.message
        })
    }
}



const login = async(req:any, res:any)=>{
    try{
        let {email, password} = req.body;
        const userData:any = await finduser(email);
        if(userData !== undefined){
            let match = bcrypt.compare(password, userData?.password);
            if(match){
                const token = jwt.sign({email:email}, 'pangong', {expiresIn : '2D'})
                res.status(200).json({
                    message : 'succesful',
                    status : userData,
                    token
                })
            }
            else{
                res.json({
                    message : 'failed',
                    status : 'Invalid Password'
                })
            }
        }
        else{
            res.json({
                message : "failed",
                status : "User Not FOund"
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







export {
    register,
    login,   
}