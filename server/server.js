let express = require('express');
let app = express();
let routes = express.Router();
let http = require('http');
let server = http.createServer(app);
let io = require('socket.io')(server);

const port = process.env.PORT || 5000;

// Agrego las routes
//routes(app);

// Conexion principal del socket
io.on('connection' , (socket) => {

    // Una persona entro a la sala.
    socket.on('entrarSala' , (jugador) => {
        console.log(jugador + ' entro a la sala. ID: ' + socket.handshake.sessionID)
        io.emit('entrarSala' , jugador);
    })

    // Alertar a los jugadores
    socket.on('alertar' , () => {
        io.emit('alerta');
        console.log('se alerto a los jugadores.');
    })
})


server.listen(port , () => {
    console.log(`Servidor abierto en el puerto ${port}`);
})