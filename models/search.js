var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var search = new Schema({
    term: String,
    when: { type: Date, default: Date.now }
});

module.exports = mongoose.model('search', search);