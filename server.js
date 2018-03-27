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
var ItemSchema = new mongoose.Schema({
    title: {type: String, required: true},
    description: {type: String, default: ''},
    completed: {type: Boolean, default: false},
    created_at: {type: Date, default: Date.now},
    updated_at: {type: Date, default: Date.now},
});
mongoose.model('Item', ItemSchema);
var Item = mongoose.model('Item');

app.get('/items', (req, res) => {
    Item.find({}, function(err, item){
        if(err){
            res.json({message: 'Error', data: err})
        }
        else{
            res.json({message: 'Success', data: item});
        }
    });
});

app.get('/items/:id', (req, res) => {
    Item.find({_id: req.params.id}, function(error, item){
        if(error){
            res.json({message: 'error'})
        }
        else{
            res.json({item: item})
        }
    });
});

app.post('/items', (req, res) => {
    var item = new Item(req.body);
    item.save(function(err, item){
        if(err){
            res.json({message: 'Error', data: 'error'})
        }
        else{
            res.json({message: 'Success', data: item})
        }
    });
});

app.put('/items/:id', (req, res) => {
    var item = Item.findOne({_id: req.params.id}, function(error, item){
        if (error) {
            res.json({message: 'Error', error: error})
        } else {
            item.title = req.body.title;
            item.description = req.body.description;
            item.completed = req.body.completed;
            item.save(function(err){
                if(err){
                    res.json({message: 'error', error: err});
                }
                else{
                    res.json({item: item});
                }
            });
        }
    });
});

app.delete('/items/:id', (req, res) => {
    Item.remove({_id: req.params.id}, function(err, item){
        if(err){
            res.json({Message: 'Error', error: err});
        }
        else{
            res.json({Message: 'Success', item: item});
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