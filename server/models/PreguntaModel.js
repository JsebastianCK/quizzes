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
    data = {
        pregunta: pregunta.pregunta,
        imagen: null
    };
    if(pregunta.imagen) {
        let bufferValue = Buffer.from(pregunta.imagen,"base64");
        data.imagen = bufferValue;
    }
    sql.query('UPDATE pregunta SET ? WHERE idPregunta = ?',
                [data , pregunta.idPregunta],
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
                        result(null,err);
                    }
                    else {
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

Pregunta.subirImagen = function (imagen, result) {
    sql.query("UPDATE pregunta SET imagen = ? where idPregunta = 11",imagen, function (err, res) {
        if(err) {
            result(null, err);
        }
        else{
            result(null, res);
        }
    });   
};

Pregunta.deletePregunta = function (idPregunta , result) {
    sql.query("DELETE FROM pregunta WHERE idPregunta = ?", idPregunta ,function (err, res) {
        if(err) {
            result(null, err);
        }
        else{
            result(null, res);
        }
    });   
};

module.exports = Pregunta;