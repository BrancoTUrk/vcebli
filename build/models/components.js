var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ComponentSchema = new Schema({
    name: String,
    html: String,
    image: String,
    discription: String,
    state: Boolean
});

module.exports = mongoose.model('Comp', ComponentSchema);