var express    = require('express');        // call express
var app        = express();                 // define our app using express
var bodyParser = require('body-parser');

// configure express to use body-parser
// this will get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 8080; //set port

var router = express.Router(); 

router.get('/', function(req, res) {
    res.json({ message: 'hooray! welcome to our api!' });   
});

app.use('/api', router);

app.listen(port);
console.log('Magic happens on port port port' + port);