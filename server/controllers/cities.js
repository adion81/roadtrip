var mongoose = require('mongoose');
var City = mongoose.model('City');
module.exports = {
    index: function(req, res){
        City.find({}, function(err, data){
            res.json(data);
        })

    },
    show: function(req, res){
        City.findById(req.params.id, function(err, city){
            res.json(city);
        })
    },
    create: function (req, res) {
        City.find({}, function (err, city) {
            var city = new City
            city.name = req.body.name
            city.north = req.body.north
            city.south = req.body.south
            city.bypass = req.body.bypass
            city.image = req.body.image
            city.activities
            city.save()
        })
    },
    updateActivity: function(req,res){
        console.log('this is controller',req.params.id);
        City.findById(req.params.id, function(err, city){
            console.log('my city========', city)
            city.name = city.name
            city.north = req.body.north
            city.south = req.body.south
            console.log('1activitititititi', req.body.activities[0])
            city.activities.push(...req.body.activities)
            city.activites[0].dangers.push(...req.bo)

            console.log('activitititititi', city.activities)
            city.bypass = req.body.bypass
            city.image = req.body.image
            city.save(function(err, data){
                console.log(err)
                console.log('success? ', data)
            })
        })
    },
    destroy: function(req,res){
        City.findById(req.params.id, function(err, city){
            city.remove()
        })
    }
}
