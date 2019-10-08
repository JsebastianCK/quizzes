let express = require('express');
let app = express();
let cors = require('cors');
let routes = require('./routes/appRoutes');
let bodyParser = require('body-parser');
let http = require('http');
let server = http.createServer(app);
let io = require('socket.io')(server);

//

const port = process.env.PORT || 5000;
const url = '192.168.1.62';

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

// Agrego las routes
routes(app);

// Conexion principal del socket
io.on('connection' , (socket) => {

    // Una persona entro a la sala.
    socket.on('entrarSala' , function(jugador){
        console.log(jugador + ' entro a la sala. ID: ' + this.conn.id);
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