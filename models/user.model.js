import { db } from "../config/db.js"
export async function userModel() {

    const conexion = db;
    const Schema = conexion.Schema;
    const userSchema = new Schema({
        nombre: String,
        apellido: String,
        email: String,
        date: Date
    });

    const userModel = await conexion.models['user'] || conexion.model('users', userSchema, 'users')
    return userModel;
}