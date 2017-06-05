var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var personaSchema = new Schema({
	'nombre': String,
	'altura': Number,
	'edad': Number,
	'sexo': Boolean
});

module.exports = mongoose.model('persona', personaSchema);