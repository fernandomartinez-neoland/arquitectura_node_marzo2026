// al ser colocado como funcion principal de la api esta recibe en automatico los parametros de peticion y respuesta y puede hacer uso directo
// esta manera de trabajar les permite trabajar de manera mas limpia y facil de leer
export function leer(req, res){
    res.send("esta es la nuva manera de leer funciones con apis")
}