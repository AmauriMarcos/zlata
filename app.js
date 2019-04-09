const bodyParser = require('body-parser'),
      ejs        = require('ejs'),
      express    = require('express'),
      app        = express();


app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static('public'));


app.get('/', (req, res) => {
    res.render('home');
});


app.get('/nivelamento', (req, res) => {
  
    res.render('nivelamento');
    
});

app.listen(3000, () => console.log('Connected on port 3000!!'));