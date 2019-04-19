const bodyParser      = require('body-parser'),
      cookieParser    = require('cookie-parser'),
      session         = require('express-session'),
      flash           = require('express-flash'),
      mongoose        = require('mongoose'),
      Contact         = require('./models/contact_form'),
      newsletterRoute = require('./routes/newsletter'),
      indexRoute      = require('./routes/index'),
      request         = require('request'),
      ejs             = require('ejs'),
      express         = require('express'),
      app             = express();

    
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static(__dirname + '/public'));

app.use(indexRoute);
app.use(newsletterRoute);

mongoose.connect('mongodb://localhost:27017/contact_form', {useNewUrlParser: true});



app.get('/login', (req, res) => {
    res.render('registrar');
});

app.post('/login', (req, res) => {
    const login = req.body.login;
    console.log(login);
    res.redirect('/');
});

app.get('/cadastrar', (req, res) => {
    res.render('registrar');
});

app.post('/cadastrar', (req, res) =>{
    const cadastro = req.body.cadastro;
    console.log(cadastro);
    res.redirect('/');
})




app.listen(3000, () => console.log('Connected on port 3000!!'));

//	1Scua7qAsWSF8DZxm9uSjh2JqLEUeMGi //Tomtom API Key