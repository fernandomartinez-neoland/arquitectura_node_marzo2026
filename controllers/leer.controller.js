// ─────────────────────────────────────────────────────────────────────────────
// ARCHIVO: controllers/leer.controller.js
// PROPÓSITO: Contiene el controlador de la operación "leer".
//            Un controlador es el intermediario entre la ruta (definida en
//            index.js) y la lógica de negocio (definida en el servicio).
//            Su única responsabilidad es: recibir la petición HTTP, llamar
//            al servicio correspondiente, y devolver la respuesta al cliente.
//            NO debe contener lógica de base de datos ni reglas de negocio.
// ─────────────────────────────────────────────────────────────────────────────

// Importamos la función "leerService" desde la capa de servicios.
// Usamos la ruta relativa '../services/leer.service.js':
//   - ".." sube un nivel (salimos de la carpeta "controllers")
//   - luego entramos a "services" y accedemos al archivo "leer.service.js"
// El servicio es quien contiene la lógica real: consultar la base de datos.
import { leerService } from '../services/leer.service.js'

// "export" hace que esta función sea importable desde otros archivos.
// En index.js la importamos con: import { leerController } from './controllers/leer.controller.js'
//
// "async" marca la función como asíncrona. Esto es necesario porque internamente
// usa "await", que pausa la ejecución hasta que la promesa del servicio resuelva.
// Sin "async", usar "await" dentro causaría un error de sintaxis.
//
// Al ser usada como callback de una ruta de Express (api.post('/lectura', leerController)),
// Express la llama automáticamente pasándole dos argumentos:
//   - req (request): objeto con toda la información de la petición HTTP entrante
//     (body, headers, parámetros de URL, cookies, IP del cliente, etc.)
//   - res (response): objeto con métodos para construir y enviar la respuesta HTTP
//     (res.send, res.json, res.status, etc.)
// Nota: usamos "_req" porque en este controlador no necesitamos leer nada
// de la petición (no hay body, ni parámetros que procesar). El guion bajo
// "_" es una convención para indicar "parámetro requerido por la firma de
// la función pero ignorado intencionalmente en esta implementación concreta".
export async function leerController(_req, res) {
    // "await leerService()" llama al servicio y espera a que termine.
    // leerService() devuelve una promesa (porque es async) que, cuando resuelve,
    // contiene el array de documentos obtenidos de MongoDB.
    //
    // res.send() envía esos datos de vuelta al cliente como respuesta HTTP.
    // Express detecta automáticamente que es un array/objeto y establece el
    // Content-Type de la respuesta como "application/json".
    //
    // El cliente (Postman, el navegador, una app frontend) recibirá el JSON
    // con todos los usuarios almacenados en la base de datos.
    res.send(await leerService())
}
