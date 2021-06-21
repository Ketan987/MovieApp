import jwt from 'jsonwebtoken';
import user from '../model/userSchema';



export default async(req:any, res:any, next:any) => {
    try{
        const authHeader = req.headers['authorization']
        const token = authHeader && authHeader.split(" ")[1]
        // const token =req.headers.authorization;
        console.log("token "+authHeader);
        if(token == null) return res.sendStatus(401)
        
        jwt.verify(token, 'pangong', (err:any, user:any) => {
            if(err) return res.status(403).send('Unauthorized Access 01 ' + err.name)
            req.user = user
            next()
    })
    } catch (error) {
        console.log('Error in Authorization ',error.message)
        return res.json({success:false,message:'Unauthorized Access'})
    }
}