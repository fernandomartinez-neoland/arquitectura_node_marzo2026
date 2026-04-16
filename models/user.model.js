// ─────────────────────────────────────────────────────────────────────────────
// ARCHIVO: models/user.model.js
// PROPÓSITO: Define la estructura (esquema) de los documentos "usuario" en
//            MongoDB y exporta una función que devuelve el modelo listo para
//            hacer consultas (find, save, deleteOne, etc.).
//            En la arquitectura MVC, los modelos son la capa que representa
//            los datos y se comunica directamente con la base de datos.
// ─────────────────────────────────────────────────────────────────────────────

// Importamos la constante "db" desde el archivo de configuración de base de datos.
// "db" es la instancia de mongoose ya conectada a MongoDB Atlas.
// La usamos aquí para acceder a Schema y model, en lugar de importar mongoose
// directamente, para asegurarnos de que siempre trabajamos sobre la misma
// conexión que ya está establecida.
import { db } from "../config/db.js"

// "export" permite que otros archivos importen esta función.
// "async" es necesario porque dentro usamos "await" al obtener el modelo.
// La función no recibe parámetros: su trabajo es simplemente preparar
// y devolver el modelo de usuario cada vez que se la llame.
export async function userModel() {

    // Guardamos la referencia a "db" en una variable local "conexion".
    // Esto es por claridad y comodidad: en lugar de escribir "db.Schema"
    // y "db.model" repetidamente, usamos el nombre más descriptivo "conexion".
    const conexion = db;

    // "Schema" es la clase de Mongoose que nos permite definir la forma
    // (estructura) que tendrán los documentos en la colección de MongoDB.
    // Es como decir "cada documento de usuarios tendrá estos campos con estos tipos".
    // Lo obtenemos desde la instancia conectada, no desde mongoose directamente,
    // para usar exactamente la misma conexión.
    const Schema = conexion.Schema;

    // Creamos una nueva instancia de Schema definiendo los campos del documento.
    // Cada propiedad del objeto es un campo y su valor es el tipo de dato:
    //   - nombre:   String → texto (ej: "Fernando")
    //   - apellido: String → texto (ej: "Martínez")
    //   - email:    String → texto (ej: "user@example.com")
    //   - date:     Date   → fecha y hora (ej: 2026-03-15T10:00:00.000Z)
    // Mongoose usará este esquema para validar los documentos antes de guardarlos
    // y para saber qué campos devolver al hacer consultas.
    const userSchema = new Schema({
        nombre: String,
        apellido: String,
        email: String,
        date: Date
    });

    // Aquí obtenemos (o creamos si no existe) el modelo de Mongoose.
    // Un "modelo" es una clase que representa una colección en MongoDB y expone
    // métodos como .find(), .findById(), .save(), .deleteOne(), etc.
    //
    // conexion.models['user'] → revisa si ya existe un modelo registrado con
    //   el nombre 'user'. Mongoose cachea los modelos para no redefinirlos en
    //   cada petición. Si existe, lo reutiliza (evita el error "Cannot overwrite
    //   model once compiled" que aparece al llamar model() dos veces con el mismo nombre).
    //
    // || (OR lógico) → si lo anterior es falsy (el modelo NO existe aún), entonces:
    //
    // conexion.model('users', userSchema, 'users') → crea el modelo nuevo.
    //   - Primer argumento  'users': nombre interno del modelo en Mongoose
    //   - Segundo argumento userSchema: el esquema que define la estructura
    //   - Tercer argumento  'users': nombre EXACTO de la colección en MongoDB
    //     (sin este tercer argumento, Mongoose pluralizaría automáticamente el nombre)
    //
    // "await" espera la resolución aunque en este caso el OR es síncrono;
    // se mantiene por consistencia con el patrón async/await del archivo.
    const userModel = await conexion.models['users'] || conexion.model('users', userSchema, 'users')

    // Devolvemos el modelo. Quien llame a esta función (el servicio) recibirá
    // un objeto con todos los métodos de Mongoose para interactuar con la
    // colección "users" de la base de datos.
    return userModel;
}
