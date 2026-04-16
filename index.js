// ─────────────────────────────────────────────────────────────────────────────
// ARCHIVO: index.js
// PROPÓSITO: Es el punto de entrada principal de la aplicación.
//            Cuando ejecutas "node index.js" o "npm run dev", Node.js empieza
//            a leer este archivo de arriba a abajo.
// ─────────────────────────────────────────────────────────────────────────────

// "import" es la forma moderna (ES Modules) de traer código de otro lugar.
// "express" es una librería (framework) que simplifica crear servidores HTTP
// en Node.js. Sin Express tendrías que escribir muchísimo más código para
// manejar rutas, peticiones y respuestas.
// Esta librería fue instalada con: npm install express
// y queda registrada en el archivo package.json dentro de "dependencies".
import express from 'express'

// Aquí importamos la función "leerController" desde el archivo de controladores.
// Las llaves { } indican que es una exportación con nombre (no la exportación
// por defecto). La ruta './controllers/leer.controller.js' es relativa a este
// archivo. La extensión '.js' es obligatoria cuando usamos ES Modules en Node.
// El controlador es quien decide qué hacer cuando llega una petición HTTP.
import { leerController } from './controllers/leer.controller.js';

// Llamamos a express() como si fuera una función fábrica: nos devuelve
// un objeto que representa nuestra aplicación/servidor. Por convención
// se suele llamar "app", pero aquí se llama "api" para dejar claro que
// estamos construyendo una API (interfaz de programación de aplicaciones).
const api = express();

// Este middleware le dice a Express que entienda JSON automáticamente.
// Un "middleware" es una función que se ejecuta en cada petición ANTES de
// que llegue a la ruta final. express.json() lee el cuerpo (body) de las
// peticiones HTTP y lo convierte de texto JSON a un objeto JavaScript,
// dejándolo disponible en req.body dentro de cualquier controlador.
// Sin esta línea, req.body estaría undefined al recibir datos JSON.
api.use(express.json())

// Definimos en qué número de puerto escuchará el servidor.
// El puerto 3000 es el más usado en desarrollo local. En producción
// normalmente se usa el puerto 80 (HTTP) o 443 (HTTPS), o el que
// asigne la plataforma de despliegue (Heroku, Railway, etc.).
// La URL completa para acceder al servidor será: http://localhost:3000
const port = 3000;


// ─── RUTA GET "/" ─────────────────────────────────────────────────────────────
// api.get() registra una ruta que responde a peticiones HTTP de tipo GET.
// El primer argumento '/' es la ruta (también llamada "endpoint" o "URL").
// El segundo argumento es una función anónima flecha que recibe:
//   - req (request / petición): contiene todo lo que envió el cliente
//     (headers, body, parámetros, cookies, etc.)
//   - res (response / respuesta): es el objeto que usamos para enviar
//     la respuesta de vuelta al cliente.
// Esta ruta sirve como prueba rápida de que el servidor está vivo.
// Para probarla: abre el navegador en http://localhost:3000
api.get('/', (_req, res) => {
    // Usamos "_req" en lugar de "req" porque en esta ruta no necesitamos
    // leer nada de la petición. El guion bajo "_" es una convención universal
    // para decir "este parámetro existe pero lo ignoro a propósito".
    // res.send() envía una respuesta al cliente. En este caso es texto plano.
    // Cuando el cliente (navegador, Postman, etc.) llame a GET /
    // recibirá el texto "conectadisimo".
    res.send("conectadisimo")
})

// ─── RUTA POST "/lectura" ──────────────────────────────────────────────────────
// api.post() registra una ruta que responde a peticiones HTTP de tipo POST.
// POST se usa cuando el cliente quiere ENVIAR datos al servidor (a diferencia
// de GET que solo pide datos).
// El endpoint es '/lectura' → la URL completa es http://localhost:3000/lectura
//
// En lugar de escribir la lógica directamente aquí (como hicimos arriba con
// la función anónima), pasamos "leerController", que es una función importada.
// Express la llamará automáticamente pasándole (req, res) cuando llegue
// una petición POST a /lectura.
// Esta separación de responsabilidades es el patrón MVC (Model-View-Controller).
api.post('/lectura', leerController)

// ─── ARRANQUE DEL SERVIDOR ────────────────────────────────────────────────────
// api.listen() pone el servidor "a la escucha" en el puerto indicado.
// A partir de este momento Node.js queda corriendo (no termina el proceso)
// esperando peticiones entrantes.
// El segundo argumento es una función callback que se ejecuta UNA SOLA VEZ
// justo cuando el servidor ya está listo para recibir conexiones.
// Usamos un "template literal" (backticks ` `) con ${port} para insertar
// el valor de la variable dentro del string dinámicamente.
api.listen(port, () => {
    console.log(`conectado a la url: http://localhost:${port}`)
})
