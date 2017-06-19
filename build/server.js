var express    = require('express');        // call express
var path       = require('path');
var app        = express();                 // define our app using express
var bodyParser = require('body-parser');

// configure express to use body-parser
// this will get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 8018; //set port
var dbsettings = {
    user: 'admin',
    pass: 'admin12345'
};

var mongoose = require('mongoose');
db = 'mongodb://'+dbsettings.user+':'+dbsettings.pass+'@ds127802.mlab.com:27802/componentdb';
mongoose.connect(db);

var Comp = require('./models/components');


var router = express.Router(); 

router.use(function (req,res,next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	console.log('something is happening.');
	next();
});

router.route('/comp')
    // create a project (accessed at POST http://localhost:8080/api/comp)
    .post(function(req, res) {      
        var component = new Comp();// create a new instance of the component model
        component.name = req.body.name;  
        component.html = req.body.html;
        component.discription = req.body.discription;
        component.state = req.body.state;
        component.image = req.body.image;
        // save the comp and check for errors
        component.save(function(err,project) {
            if (err)
                res.send(err);
            res.json({id: project._id});
        });
        
    })
    .get(function(req, res){
    	Comp.find(function(err, comp){
    		if(err)
    			res.send(err);
    		res.json(comp);
    	});
    });

router.route('/comp/:comp_id')
    .get(function(req, res){
    	Comp.findById(req.params.comp_id, function(err, component){
    		if (err)
    			res.send(err);
    		res.json(component);
    	});
    })
    .put(function(req,res){
    	Comp.findById(req.params.comp_id, function(err, component){
    		if (err)
    			res.send(err);
    		component.name = req.body.name;
    		component.html = req.body.html;
            component.discription = req.body.discription;
            component.state = req.body.state;
            component.image = req.body.image;
    		component.save(function (err) {
    			if (err)
    				res.send(err);
    			res.json({message: 'Successfully updated!'});
    		});
    	});
    })
    .delete(function(req,res){
        Comp.remove({
            _id: req.params.comp_id
        }, function(err, comp) {
            if (err)
                res.send(err);
            res.json({ message: 'Successfully deleted' });
        });
    });

app.use('/api', router);

app.use(express.static(path.join(__dirname, 'public')));

app.listen(port);
console.log('Magic happens on port ' + port);