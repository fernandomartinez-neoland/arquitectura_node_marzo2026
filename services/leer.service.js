import { userModel } from "../models/user.model.js"
export async function leerService(){
    const User = await userModel();
    return User.find()
}