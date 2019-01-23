var mongoose = require('mongoose')

var TripSchema = new mongoose.Schema({
    
}, {timestamps: true});
mongoose.model('Trip', TripSchema);
var Trip = mongoose.model('Trip', TripSchema);