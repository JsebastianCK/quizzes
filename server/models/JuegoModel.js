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
                FROM serie
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
        sql.query("SELECT * FROM juego WHERE idJuego = ? ", juegoId, function (err, res) {             
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
            SELECT pr.*
            FROM serie sr
            INNER JOIN pregunta pr
                ON pr.idPregunta = sr.idPregunta
            WHERE sr.idJuego = ?
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
        INSERT INTO serie (idJuego,idPregunta) VALUES (?) 
    `, [datos.idJuego , datos.idPregunta] , (err,res) => {
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
            console.log(err);
            result(null,err);
        }
        else {
            console.log(res.insertId);
            result(null,res);
        }
    });
}

module.exports = Juego;