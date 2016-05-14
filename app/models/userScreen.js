// models/userScreen.js
var mongoose = require('mongoose');

var Schema = mongoose.Schema;
 
var screenSchema = new Schema({
    screen_id: String,
    email: String,
    company_id: String
},{collection: 'TN_CMS_USER_SCREEN'});
 
module.exports = mongoose.model('userScreen', screenSchema);