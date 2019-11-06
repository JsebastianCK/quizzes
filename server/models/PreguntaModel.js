var sql = require('../db');

//Pregunta object constructor
var Pregunta = function(pregunta){
    this.pregunta = pregunta.pregunta;
};

Pregunta.getPreguntaById = function (preguntaId, result) {
        sql.query("SELECT * FROM pregunta WHERE idPregunta = ? ", preguntaId, function (err, res) {             
            if(err) {
                result(err, null);
            }
            else{
                result(null, res);
            }
        });   
};

Pregunta.updatePregunta = function(pregunta , result) {
    sql.query('UPDATE pregunta SET pregunta = ? WHERE idPregunta = ?',
                [pregunta.pregunta , pregunta.idPregunta],
                (err,res) => {
                    if(err)
                        result(null,err);
                    else
                        result(null,res);
                })
}

Pregunta.createPregunta = function(pregunta , result) {
    sql.query('INSERT INTO pregunta(pregunta) VALUES (?)',
                [pregunta.pregunta],
                (err,res) => {
                    if(err) {
                        console.log(err);
                        result(null,err);
                    }
                    else {
                        console.log(res);
                        result(null,res);
                    }
                })
}

Pregunta.getAllPreguntas = function (result) {
        sql.query("SELECT * FROM pregunta", function (err, res) {
            if(err) {
                result(null, err);
            }
            else{
                result(null, res);
            }
        });   
};

module.exports = Pregunta;