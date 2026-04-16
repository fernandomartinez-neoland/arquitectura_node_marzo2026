import mongoose from 'mongoose'


export const db = await mongoose.connect('mongodb+srv://usuario_prueba:123@cluster0.w6ghmta.mongodb.net/marzo2026')
    .then(
        console.log("conectado por el console.log")
    )
    .catch((e) => {
        console.log("error de conexion")
        return e.message
    })
