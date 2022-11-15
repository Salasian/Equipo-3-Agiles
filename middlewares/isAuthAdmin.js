import jwt from 'jsonwebtoken';
export const isAuthAdmin = async(req, res, next) =>{
    try {
        let token = req.headers['x-access-token'] || req.headers['authorization'];
    if(!token){
        return res.send({message: 'the user is not authorized'});
    }

    if(token.startsWith('Bearer ')){
        token = token.slice(7, token.lenght);
    }
    
    if(token){ //verificamos token
        jwt.verify(token, process.env.SECRET_KEY_ADMIN, (error, decode)=>{
            if(error){
                return res.send({message: 'token no valido'});
            }
            req.decode = decode;
            next();
        });
    }
    } catch (error) {
        return res.status(400).send({ message: 'token error' });
    }
}