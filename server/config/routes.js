var cities = require('../controllers/cities');

module.exports = function(app){
    app.get('/cities', (req, res) => cities.index(req,res));
    app.get('/city/:id', (req,res) => cities.show(req,res));
    app.post('/new/city', (req, res) => {
        console.log('this is routes',req.body);
        cities.create(req,res);
    });
    app.put('/update/city/:id', (req,res) => {
        console.log(req.params.id)
        console.log(req.body.activities.dangers)
        console.log(req.body)
        cities.updateActivity(req,res)
    });
    app.delete('/destroy/city/:id', (req, res) => cities.destroy(req, res));

}