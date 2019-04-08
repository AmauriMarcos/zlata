const bodyParser = require('body-parser'),
      mongoose   = require('mongoose'),
      ejs        = require('ejs'),
      express    = require('express'),
      app        = express();


app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static('public'));

mongoose.connect('mongodb://localhost:27017/onePage', {useNewUrlParser: true});


app.get('/', (req, res) => {
    res.render('home');
});




app.listen(3000, () => console.log('Connected on port 3000!!'));