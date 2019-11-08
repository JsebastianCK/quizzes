var sql = require('../db');

//Pregunta object constructor
var Respuesta = function(respuesta){
    this.respuesta = respuesta.respuesta;
};
Respuesta.getRespuestasByPregunta = (idPregunta , result) => {
    sql.query(`
            SELECT *
            FROM respuesta
            WHERE idPregunta = ?
        `, idPregunta , (err,res) => {
        if(err)
            result(err,null);
        else
            result(null,res);
    })
}

Respuesta.updateCorrecta = function(respuesta , result) {
    sql.query('UPDATE respuesta SET correcta = ? WHERE idRespuesta = ?',
                [respuesta.correcta ,respuesta.idRespuesta],
                (err,res) => {
                    if(err)
                        result(null,err);
                    else
                        result(null,res);
                })
}

Respuesta.updateRespuesta = function(respuesta , result) {
    sql.query(`UPDATE respuesta
                SET
                respuesta = ?
                WHERE idRespuesta = ?`,
                [respuesta.respuesta, respuesta.idRespuesta],
                (err,res) => {
                    if(err)
                        result(null,err);
                    else
                        result(null,res);
                })
}

Respuesta.insertRespuesta = function(respuesta , result) {
    sql.query(`
    INSERT INTO respuesta
    (respuesta, idPregunta, correcta) VALUES(?,?,?)`,
    [respuesta.respuesta, respuesta.idPregunta, respuesta.correcta ,respuesta.idRespuesta],
    (err,res) => {
        if(err)
            result(null,err);
        else
            result(null,res);
    })
}

Respuesta.deleteRespuesta = function(idRespuesta , result) {
    sql.query(`
    DELETE FROM respuesta WHERE idRespuesta = ?`,
    idRespuesta,
    (err,res) => {
        console.log(idRespuesta);
        if(err)
            result(null,err);
        else
            result(null,res);
    })
}

module.exports = Respuesta;