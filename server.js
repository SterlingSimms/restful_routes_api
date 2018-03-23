let express     = require('express'),
    app         = express(),
    path        = require('path'),
    session     = require('express-session'),
    body_parser = require('body-parser'),
    mongoose    = require('mongoose');

app.use(body_parser.json());
app.use(express.static( __dirname + '/client/dist' ));
app.use(session({
    secret: '^P%mUWCwF4hWAhtgUb8BrRqWPuR$%4w^@FSB3j*VfumMEJB8SPpr57%aqRmsEyHGhJKcvgu9#W&5ZvUrCZ*q4c%8^A9RJ49@Mf3X',
    proxy: true,
    resave: false,
    saveUninitialized: true
}));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
mongoose.connect('mongodb://localhost/routes', function() {
    console.log(mongoose.connection.readyState + ' ' + "1 = connected");
});
mongoose.Promise = global.Promise;
var Schema = mongoose.Schema;
var ObjectSchema = new mongoose.Schema({
    title: {type: String, required: true},
    description: {type: String, default: ''},
    completed: {type: Boolean, default: false},
    created_at: {type: Date, default: Date.now},
    updated_at: {type: Date, default: Date.now},
});
mongoose.model('Object', ObjectSchema);
var object = mongoose.model('Object');

app.get('/objects', (req, res) => {
    Object.find({}, function(err, object){
        if(err){
            res.json({message: 'error'})
        }
        else{
            res.json({object: objects});
        }
    });
});

app.get('/objects/:id', (req, res) => {
    Object.find({_id: req.params.id}, function(error, object){
        if(err){
            res.json({message: 'error'})
        }
        else{
            res.json({object: object})
        }
    });
});

app.post('/objects', (req, res) => {
    var object = new Object(req.body);
    object.save(function(err, object){
        if(err){
            res.json({message: 'error'})
        }
        else{
            res.json({object: object})
        }
    });
});

app.put('/objects/:id', (req, res) => {
    var object = Object.find({_id: req.params.id}, function(err, object){
        object.title = req.params.title;
        object.description = req.params.description;
        object.completed = req.params.completed;
        object.save(function(){
            if(err){
                res.json({message: 'error'});
            }
            else{
                res.json({object: objects});
            }
        });
    });
});

app.delete('/objects/:id', (req, res) => {
    Object.remove({_id: req.params.id}, function(err, object){
        if(err){
            res.json({message: 'error'});
        }
        else{
            res.json({object: objects});
        }
    });
});

let server = app.listen(6789, () => {
    console.log("listening on port 6789");
});

// io.sockets.on('connection', function (socket) {
//     console.log("Client/socket is connected!");
//     console.log("Client/socket id is: ", socket.id);
// });