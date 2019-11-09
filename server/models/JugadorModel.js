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

Jugador.getJugador = (idJugador, result) => {
    sql.query('SELECT * FROM jugador WHERE idJugador = ?' ,idJugador, (err,res) => {
        if(err)
            result(err,null);
        else
            result(null,res);
    })  
}

Jugador.createJugador = function(nuevoJugador , result) {
    sql.query(`
        INSERT INTO jugador SET ?
    `, nuevoJugador , (err,res) => {
        if(err)
            result(null,err);
        else {
            result(null,res);
        }
    });
}

Jugador.updateJugador = function(jugador , result) {
    data = {
        nombre: jugador.nombre,
        puntaje: jugador.puntaje,
        preguntaActual: jugador.preguntaActual,
        jugando: jugador.jugando
    };
    console.log(data);
    console.log(jugador.idJugador);
    sql.query('UPDATE jugador SET ? WHERE idJugador = ?',
                [data , jugador.idJugador],
                (err,res) => {
                    if(err)
                        result(null,err);
                    else
                        result(null,res);
                })
}

Jugador.deleteJugador = function(idJugador , result) {
    sql.query("DELETE FROM jugador WHERE idJugador = ?", idJugador , (err,res) => {
        if(err)
            result(null,err);
        else {
            result(null,res);
        }
    });
}

module.exports = Jugador;