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

app.use(bodyParser.urlencoded({limit: '50mb', extended: true }));
app.use(bodyParser.json({limit: '50mb', extended: true}));
app.use(cors());

// Agrego las routes
routes(app);

// Conexion principal del socket
io.on('connection' , (socket) => {
    const idJugador = socket.id.trim();
    let adentro = false;
    // Una persona entro a la sala.
    socket.on('entrarSala' , function(jugador){
        adentro = true;
        jugador.idJugador = idJugador;
        Jugador.createJugador({
            idJugador:idJugador,
            nombre: jugador.nombre,
            puntaje: 0,
            preguntaActual: 0,
            jugando: 0,
            correctas: 0,
            incorrectas: 0
        } , () => {});
        io.emit('entrarSala' , jugador);
        io.to(jugador.idJugador).emit('devolverID' , idJugador);
    });

    // El jugador avanzo a la siguiente pregunta.
    socket.on('pasoPregunta' , function(jugador) {
        jugador.idJugador = idJugador;
        io.emit('pasoPregunta' , jugador);
    });

    // Alertar a los jugadores
    socket.on('alertar' , () => {
        io.emit('alerta');
    })

    socket.on('iniciarJuego' , (idJuego) => {
        io.emit('inicioJuego' , idJuego);
    })

    socket.on('expulsarJugador' , function(jugador) {
        io.to(jugador.idJugador).emit('expulsado');
        Jugador.deleteJugador(jugador.idJugador , () => {});
        io.emit('salirSala' , idJugador);
        // socket.disconnect();
    });

    socket.on('disconnect', function() {
        if(adentro) {
            Jugador.deleteJugador(idJugador , () => {});
            io.emit('salirSala' , idJugador);
        }
    })

    socket.on('cambioConfiguracion' , () => {
        io.emit('cambioConfiguracion');
    })

    socket.on('terminoTodo' , () => {
        io.emit('terminoTodo');
    })
})


server.listen(port , () => {
    console.log(`Servidor abierto en el puerto ${port}`);
})