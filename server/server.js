let express = require('express');
let app = express();
let routes = require('./routes/appRoutes');
let bodyParser = require('body-parser');
let http = require('http');
let server = http.createServer(app);
let io = require('socket.io')(server);

const port = process.env.PORT || 5000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Agrego las routes
routes(app);

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