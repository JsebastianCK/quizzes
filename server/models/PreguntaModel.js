var sql = require('../db');

//Pregunta object constructor
var Pregunta = function(pregunta){
    this.pregunta = pregunta.pregunta;
};

Pregunta.getPreguntaById = function (preguntaId, result) {
        sql.query("SELECT pregunta FROM pregunta WHERE idPregunta = ? ", preguntaId, function (err, res) {             
                if(err) {
                    console.log("error: ", err);
                    result(err, null);
                }
                else{
                    result(null, res);
              
                }
            });   
};

Pregunta.getAllPreguntas = function (result) {
        sql.query("SELECT * FROM pregunta", function (err, res) {

                if(err) {
                    console.log("error: ", err);
                    result(null, err);
                }
                else{
                  console.log('tasks : ', res);  

                 result(null, res);
                }
            });   
};

module.exports = Pregunta;