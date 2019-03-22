const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let phonebookSchema = new Schema({
    id: Number,
    name: String,
    phone: String
})

module.exports = mongoose.model('Data', phonebookSchema);