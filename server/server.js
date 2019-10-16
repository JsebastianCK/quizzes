let express = require('express');
let app = express();
let cors = require('cors');
let routes = require('./routes/appRoutes');
let bodyParser = require('body-parser');
let http = require('http');
let server = http.createServer(app);
let io = require('socket.io')(server);

//Otros
let Jugador = require('./models/JugadorModel');

const port = process.env.PORT || 5000;
const url = '192.168.1.62';

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

// Agrego las routes
routes(app);

// Conexion principal del socket
io.on('connection' , (socket) => {
    const idJugador = socket.id.trim();
    let adentro = false;
    // Una persona entro a la sala.
    socket.on('entrarSala' , function(jugador){
        console.log(`${idJugador}: ${jugador.nombre}`);
        adentro = true;
        jugador.idJugador = idJugador;
        Jugador.createJugador({
            idJugador:idJugador,
            nombre: jugador.nombre,
            puntaje: 0
        } , () => {});
        io.emit('entrarSala' , jugador);
    })

    // Alertar a los jugadores
    socket.on('alertar' , () => {
        io.emit('alerta');
        console.log('se alerto a los jugadores.');
    })

    socket.on('iniciarJuego' , (idJuego) => {
        io.emit('inicioJuego' , idJuego);
    })

    socket.on('disconnect', function() {
        if(adentro) {
            console.log(`Se deconecto ${idJugador}`);
            Jugador.deleteJugador(idJugador , () => {});
            io.emit('salirSala' , idJugador);
        }
    })
})


server.listen(port , () => {
    console.log(`Servidor abierto en el puerto ${port}`);
})