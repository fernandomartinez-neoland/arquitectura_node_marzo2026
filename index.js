import express from 'express'
import { leer } from './controllers/leer.controller.js';
const api=express();
api.use(express.json())

const port=3000;


api.get('/',(req, res)=>{
    res.send("conectadisimo")
})

// si colocamos una funcion que hemos importado, esta por defecto toma como parametro a req(peticion) y res(respuesta)
api.post('/lectura',leer)

api.listen(port, ()=>{
    console.log(`conectado a la url: http://localhost:${port}`)
})