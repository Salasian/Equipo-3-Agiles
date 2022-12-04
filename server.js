import express from "express";
import routerLogin from "./routes/auth.route.js";
import routerAdmin from "./routes/admin.route.js";
import routerClient from "./routes/client.route.js";
import { handleError } from "./middlewares/handleError.js";
import cors from "cors";

//Se importa el server de los sockets
import {Server} from "socket.io";


const app = express();
app.use(cors());
app.use(express.json());

app.use("/auth", routerLogin);
app.use(routerClient);
app.use(routerAdmin);

app.use(handleError);

//Aquí está la parte del server del chat//

//Configuración del puerto
app.set('port', process.env.PORT || 3000);

//archivos estáticos
app.use(express.static('./public')); //Nuestra app express -> va a utilizar -> un archivo estático -> llamado 'public'

//Iniciamos el server
const server = app.listen(app.get('port'), () => { //Servidor escuchando
    console.log('Servidor en el puerto ', app.get('port'));
});

//Configuración del socketio
const io = new Server(server);

//websockets
io.on('connection', (socket) => {
    console.log('Nueva conexión del socket: ', socket.id);

    socket.on('chat:message', (data) =>{
        io.sockets.emit('chat:message', data);
    });

    socket.on('chat:typing', (data) =>{
        socket.broadcast.emit('chat:typing', data);
    })
});





