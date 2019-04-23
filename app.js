require('dotenv').config();
const bodyParser      = require('body-parser'),
      cookieParser    = require('cookie-parser'),
      session         = require('express-session'),
      flash           = require('express-flash'),
      mongoose        = require('mongoose'),
      Contact         = require('./models/contact_form'),
      User            = require('./models/user'),
      newsletterRoute = require('./routes/newsletter'),
      indexRoute      = require('./routes/index'),
      request         = require('request'),
      ejs             = require('ejs'),
      encrypt         = require('mongoose-encryption'),
      express         = require('express'),
      app             = express();

    
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static(__dirname + '/public'));

app.use(indexRoute);
app.use(newsletterRoute);

mongoose.connect('mongodb://localhost:27017/English_for_Kids', {useNewUrlParser: true});



app.get('/login', (req, res) => {
    res.render('registrar');
});

app.post('/login', (req, res) => {
    const email = req.body.login.email;
    const password = req.body.login.password;

    User.findOne({email: email}, (err, foundUser) =>{
        if(err){
            console.log(err);
        } else {
            if(foundUser){
                if(foundUser.password === password){
                    console.log(foundUser.password);
                    console.log(password);
                    res.render('nivelamento');
                } 
            } 
        }
    });

});

app.get('/cadastrar', (req, res) => {
     res.render('registrar');  
});

app.post('/cadastrar', (req, res) =>{
    const cadastro = req.body.cadastro;
    User.create({nickname: cadastro.nickname, email: cadastro.email, password: cadastro.password},(err) => {
             err ? console.log(err) : console.log('Successfully added a new user!');  res.render('home');
            
    });
})




app.listen(3000, () => console.log('Connected on port 3000!!'));

//	1Scua7qAsWSF8DZxm9uSjh2JqLEUeMGi //Tomtom API Key