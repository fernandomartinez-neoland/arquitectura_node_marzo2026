import express from 'express'

const api=express();
api.use(express.json())

const port=3000;


api.get('/',(req, res)=>{
    res.send("conectadisimo")
})



api.listen(port, ()=>{
    console.log(`conectado a la url: http://localhost:${port}`)
})