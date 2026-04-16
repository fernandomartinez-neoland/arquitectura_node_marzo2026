// ─────────────────────────────────────────────────────────────────────────────
// ARCHIVO: services/leer.service.js
// PROPÓSITO: Contiene la lógica de negocio de la operación "leer".
//            Un servicio es la capa que sabe QUÉ hacer con los datos:
//            consultar, filtrar, transformar, calcular, etc.
//            El controlador delega el trabajo aquí; el servicio delega
//            el acceso a datos al modelo. Esta separación hace el código
//            más fácil de mantener, probar y reutilizar.
// ─────────────────────────────────────────────────────────────────────────────

// Importamos la función "userModel" desde la capa de modelos.
// Esta función nos devuelve el modelo de Mongoose listo para hacer consultas.
// La ruta '../models/user.model.js' sube un nivel (sale de "services")
// y entra a la carpeta "models".
import { userModel } from "../models/user.model.js"

// "export" permite que el controlador importe esta función.
// "async" es necesario porque usamos "await" dentro: tanto para obtener
// el modelo como para esperar que MongoDB devuelva los datos.
export async function leerService() {
    // Llamamos a userModel() para obtener la clase/modelo de Mongoose.
    // "await" espera a que la función asíncrona termine de preparar el modelo.
    // El resultado, guardado en "User", es un objeto que expone métodos de
    // consulta como .find(), .findById(), .findOne(), .countDocuments(), etc.
    const User = await userModel();

    // User.find() es el método de Mongoose para buscar documentos en MongoDB.
    // Sin argumentos (como aquí), devuelve TODOS los documentos de la colección.
    // Si quisiéramos filtrar podríamos pasar un objeto:
    //   User.find({ nombre: "Fernando" }) → solo usuarios llamados Fernando
    //   User.find({ date: { $gte: new Date('2026-01-01') } }) → por fecha, etc.
    //
    // find() devuelve una Promesa que resuelve con un array de documentos.
    // NO usamos "await" aquí porque el controlador ya hace "await leerService()"
    // y la promesa se resuelve en esa capa. Ambas formas funcionan; esta es
    // más concisa al evitar un await extra.
    //
    // El array de documentos resultante viajará de vuelta al controlador,
    // que lo enviará como respuesta JSON al cliente.
    return User.find()
}
