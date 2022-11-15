
export const handleError = (error, req, res, next)=>{
    res.json({message: error.message});
    // res.status(error.httpStatusCode).send(error.message);
    next();
}