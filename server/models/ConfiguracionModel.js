var sql = require('../db');

//Pregunta object constructor
var Configuracion = function(configuracion){
    this.titulo             = configuracion.titulo;
    this.mensajeBienvenida  = configuracion.mensajeBienvenida;
    this.imagenPresentacion = configuracion.imagenPresentacion;
    this.fondoJuego         = configuracion.fondoJuego;
    this.tiempoPregunta     = configuracion.tiempoPregunta;
};
Configuracion.getConfiguracion = (result) => {
    sql.query(`
            SELECT * FROM configuracion LIMIT 1
        ` , (err,res) => {
        if(err)
            result(err,null);
        else
            result(null,res);
    })
}
Configuracion.updateConfiguracion = (configuracion, result) => {
    if(configuracion.imagenPresentacion.length > 0) {
        let bufferValue = Buffer.from(configuracion.imagenPresentacion, 'base64');
        configuracion.imagenPresentacion = bufferValue;
    }
    sql.query(`
            UPDATE configuracion SET ?
        `,configuracion , (err,res) => {
        if(err)
            result(err,null);
        else
            result(null,res);
    })
}

module.exports = Configuracion;