import AppError from "../AppError";
import { Response } from "express";
export const handleUncaughtException =()=>{
process.on('uncaughtException',err =>{
    console.log('uncaught exception shutting down...')
    console.log(err.name,err.message);
    process.exit(1)
  
  })
}


export const  handelUnhandledRejection= ()=>{
    process.on('unhandledRejection',err =>{
        console.log('uncaught exception shutting down...')
        console.log(err instanceof Error,err,) ;
        process.exit(1)
      
      })
}

interface errorData{
    statusCode:any,
    error:String,    
}

const sendErrorDev = (err:any ,res:Response)=>{
    try{

   res.status(err.statusCode).json({
    status:err.status,
    error: err,
    message: err.message,
    stack: err.stack
  })
}catch(err){
    console.log(err)
}

}

const error: errorData = {
    statusCode:404,
    error: 'Route Not defined',

};

const sendErrorProd = (err:any, res:Response)=>{
    try{
    if(err.isOperational){
 res.status(err.statusCode).json({
        status:err.status,
        error:err,
        message:err.message
    })
}else {
    console.log('error',err)
    res.status(500).json({
        status: 'error',
        message: 'Something went very wrong!'
      });
}
}catch(err){
    console.log(err)
}
}



export const globalErrorHandler =(err:any, res:Response)=>{
    err.statusCode = err.statusCode || 500;
    err.status = err.status || 'error';
    if( process.env.NODE_ENV === 'development'){
     sendErrorDev(error ,res)
    }else if(process.env.NODE_ENV === 'production'){
         sendErrorProd(err,res)
    }
}


