var sql = require('../db');

//Pregunta object constructor
var Juego = function(juego){
    this.descripcion = juego.descripcion;
};
Juego.getAllJuegos = (result) => {
    sql.query(`
            SELECT jg.* , sr.cantPreguntas
            FROM juego jg
            LEFT JOIN (
                SELECT idJuego , count(*) as cantPreguntas
                FROM pregunta
                GROUP BY idJuego
            ) sr
            ON sr.idJuego = jg.idJuego
        ` , (err,res) => {
        if(err)
            result(err,null);
        else
            result(null,res);
    })
}


Juego.getJuegoById = function (juegoId, result) {
        sql.query(`
            SELECT jg.*, sr.cantPreguntas
            FROM juego jg
            LEFT JOIN (
                SELECT idJuego, count(*) as cantPreguntas
                FROM pregunta
                GROUP BY idJuego
            ) sr
            ON jg.idJuego = sr.idJuego
            WHERE jg.idJuego = ? `, juegoId, function (err, res) {             
            if(err) {
                result(err, null);
            }
            else{
                result(null, res);
            }
        });   
};

Juego.getAllPreguntas = function (juegoId, result) {
        sql.query(`
            SELECT *
            FROM pregunta
            WHERE idJuego = ?
            ORDER BY idPregunta
            `, juegoId, function (err, res) {
            if(err) {
                result(null, err);
            }
            else{
                result(null, res);
            }
        });   
};

Juego.insertPregunta = function(datos , result) {
    sql.query(`
        INSERT INTO pregunta (idJuego,pregunta) VALUES (?,?) 
    `, [datos.idJuego , datos.pregunta] , (err,res) => {
        if(err) {
            console.log(err);
            result(null,err);
        }
        else {
            result(null,res);
        }
    });
}

Juego.createJuego = function(nuevoJuego , result) {
    sql.query(`
        INSERT INTO juego (descripcion) VALUES (?)
    `, [nuevoJuego.descripcion] , (err,res) => {
        if(err) {
            console.log(err);
            result(null,err);
        }
        else {
            console.log(res.insertId);
            result(null,res);
        }
    });
}

Juego.deleteJuego = function(idJuego , result) {
    sql.query(`
        DELETE FROM juego WHERE idJuego = ?
    `, [idJuego] , (err,res) => {
        if(err) {
            result(null,err);
        }
        else {
            result(null,res);
        }
    });
}

module.exports = Juego;