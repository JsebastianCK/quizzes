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
module.exports = Respuesta;