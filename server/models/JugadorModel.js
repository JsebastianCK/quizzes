var sql = require('../db');

//Pregunta object constructor
var Jugador = function(jugador){
    this.idJugador = jugador.idJugador;
    this.nombre = jugador.nombre;
    this.puntaje = jugador.puntaje;
};

Jugador.getAllJugadores = (result) => {
    sql.query('SELECT * FROM jugador' , (err,res) => {
        if(err)
            result(err,null);
        else
            result(null,res);
    })  
}

Jugador.createJugador = function(nuevoJugador , result) {
    console.log(nuevoJugador);
    sql.query(`
        INSERT INTO jugador SET ?
    `, nuevoJugador , (err,res) => {
        if(err)
            result(null,err);
        else {
            console.log(res.insertId);
            result(null,res);
        }
    });
}

module.exports = Jugador;