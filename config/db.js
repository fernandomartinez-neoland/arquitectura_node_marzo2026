// ─────────────────────────────────────────────────────────────────────────────
// ARCHIVO: config/db.js
// PROPÓSITO: Establecer y exportar la conexión a la base de datos MongoDB.
//            Todos los archivos del proyecto que necesiten hablar con la base
//            de datos importarán la conexión desde aquí, en lugar de conectarse
//            cada uno por su cuenta. Así hay UNA sola conexión reutilizada.
// ─────────────────────────────────────────────────────────────────────────────

// "mongoose" es la librería ODM (Object Document Mapper) para MongoDB en Node.js.
// ODM significa que nos permite trabajar con los documentos de MongoDB como si
// fueran objetos JavaScript normales, con validaciones, métodos y esquemas.
// Fue instalada con: npm install mongoose
// Mongoose internamente usa el driver oficial de MongoDB para Node.js.
import mongoose from 'mongoose'


// "export const" hace que esta variable sea accesible desde otros archivos.
// Cualquier archivo que haga: import { db } from '../config/db.js'
// recibirá lo que esta constante devuelva.
//
// "await" pausa la ejecución HASTA que la promesa de mongoose.connect() resuelva.
// Esto solo funciona en el nivel superior del módulo porque en package.json
// tenemos "type": "module" (ES Modules). En CommonJS (require) no se puede usar
// await fuera de una función async; con ES Modules sí se puede ("top-level await").
//
// mongoose.connect() recibe la cadena de conexión (connection string) de MongoDB.
// Formato: mongodb+srv://usuario:contraseña@cluster.dominio/nombreBaseDatos
//   - "mongodb+srv://" → protocolo que usa DNS SRV para encontrar el cluster
//   - "usuario_prueba"  → nombre del usuario creado en MongoDB Atlas
//   - "123"             → contraseña de ese usuario (en producción nunca se escribe
//                         en el código; se usa una variable de entorno: process.env.DB_PASS)
//   - "cluster0.w6ghmta.mongodb.net" → dirección del cluster en MongoDB Atlas (la nube)
//   - "/marzo2026"      → nombre de la base de datos a la que conectarse
//
// mongoose.connect() devuelve una Promesa. Las promesas tienen dos caminos:
//   .then()  → se ejecuta si la conexión fue EXITOSA
//   .catch() → se ejecuta si la conexión FALLÓ (red caída, credenciales erróneas, etc.)
export const db = await mongoose.connect('mongodb+srv://usuario_prueba:123@cluster0.w6ghmta.mongodb.net/marzo2026')
    .then(
        // Si la conexión es exitosa, entonces se ejecuta este bloque.
        // Aquí solo mostramos un mensaje en la consola del servidor para confirmar.
        // El valor que devuelve .then() (la instancia de mongoose conectada)
        // es lo que quedará guardado en la constante "db".
        console.log("conectado por el console.log")
    )
    .catch((e) => {
        // Si la conexión falla, "e" es el objeto Error que lanzó mongoose.
        // Mostramos un mensaje genérico para avisar del fallo.
        console.log("error de conexion")
        // e.message contiene el texto descriptivo del error (ej: "Authentication failed").
        // Lo retornamos para que "db" tenga ese string en caso de fallo,
        // aunque en la práctica lo ideal sería lanzar el error o detener el proceso.
        return e.message
    })
