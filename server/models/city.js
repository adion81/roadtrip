var mongoose = require('mongoose')

var DangerSchema = new mongoose.Schema({
    danger: String,
    message: String,
    damage: Number
    
})
mongoose.model('Danger', DangerSchema);
var ActivitySchema = new mongoose.Schema({
    title: String,
    message: String,
    dangers: [DangerSchema]
})
mongoose.model('Activity', ActivitySchema);
var CitySchema = new mongoose.Schema({
    name: String,
    activities: [ActivitySchema],
    bypass: Number,
    north: Number,
    south: Number,
    image: String
})
mongoose.model('City', CitySchema);