
const bodyParser            = require('body-parser'),
      session               = require('express-session'),
      passport              = require('passport'),
      passportLocalMongoose = require('passport-local-mongoose'),
      cookieParser          = require('cookie-parser'),     
      flash                 = require('express-flash'),
      mongoose              = require('mongoose'),
      Contact               = require('./models/contact_form'),
      User                  = require('./models/user'),
      newsletterRoute       = require('./routes/newsletter'),
      indexRoute            = require('./routes/index'),
      request               = require('request'),
      ejs                   = require('ejs'),
      express               = require('express'),
      app                   = express();

const LocalStrategy  = require('passport-local').Strategy;
// const GoogleStrategy = require('passport-google-oauth20').Strategy;
const findOrCreate   = require('mongoose-findorcreate');
const nodeMailer = require('nodemailer');


app.set('view engine', 'ejs');
mongoose.set('useCreateIndex', true);
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static(__dirname + '/public'));
app.use(cookieParser());

app.use(indexRoute);
app.use(newsletterRoute);

app.use(session(
    {
        secret: 'Gosto de jogar video game.',
        resave: false,
        saveUninitialized: false       
    }
));

app.use(passport.initialize());
app.use(passport.session());

app.use(function(req, res, next){
    res.locals.currentUser = req.user;
    next();
});

mongoose.connect('mongodb://localhost:27017/English_for_Kids', {useNewUrlParser: true});



passport.serializeUser(User.serializeUser());

passport.deserializeUser(User.deserializeUser());

// passport.use(new GoogleStrategy({
//     clientID: process.env.CLIENT_ID,
//     clientSecret: process.env.CLIENT_SECRET,
//     callbackURL: "http://localhost:3000/auth/google/nivelamento",
//     userProfileURL:"https://www.googleapis.com/oauth2/v3/userinfo"
//   },
//   function(accessToken, refreshToken, profile, cb) {
//     User.findOrCreate({ googleId: profile.id }, function (err, user) {
//       return cb(err, user);
//     });
//   }
// ));



app.get('/', (req, res) => {  
    console.log(req.user);
    res.render('home', {currentUser: req.user});

});



app.post('/', (req, res) => {
    let transporter = nodeMailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
            user: 'zlata.englishforkids@gmail.com',
            pass: 'zlata123'
        }
    });
    let mailOptions = {
        from: '"' + req.body.contact.name + '" <' + req.body.contact.email + '>', // sender address
        to: 'miljkovicmarija85@gmail.com',
        subject: 'English for Kids recebeu uma nova mensagem', // list of receivers
        html: '<p>'+req.body.contact.message+'</p>' // html body
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('Message %s sent: %s', info.messageId, info.response);
               res.render("home");
        });   
 });
 

app.get('/login', (req, res) => {
    res.render('login');
});


app.get('/register', (req, res) => {
     res.render('register');  
});


app.get('/nivelamento', isLoggedIn, (req, res) =>{
      res.render("nivelamento");
});    


app.get('/newsletter', isLoggedIn, (req, res) =>{  

    res.render('newsletter');    

});

app.post('/newsletter', (req, res) =>{
    const news = req.body.news;
    console.log(news.email);

    const data = {
        members: [
            {
                email_address: news.email,
                status: 'subscribed',
                merge_fields: {
                    FNAME: news.nome,
                    LNAME: news.sobrenome
                }

            }
        ]
    };

    const jsonData = JSON.stringify(data);

    const options = {
        url: 'https://us20.api.mailchimp.com/3.0/lists/14ef3243b9',
        method: 'POST',
        headers: {
            'Authorization': 'zlata 9d62f9b32fd6b90b686110584073b911-us20'
        },
        body: jsonData
    };

    request(options, (error, response, body) =>{
        if(error){
            res.sendFile(__dirname + "/failure.html")
            console.log(response.statusCode);
        } else{
            if(response.statusCode === 200){
                console.log(response.statusCode);
                res.sendFile(__dirname + "/success.html")
            } else{
                res.sendFile(__dirname + "/failure.html")
            }            
        }
    });
});

app.post('/register', (req, res) =>{
    User.register({username: req.body.username}, req.body.password, function(err, user){
        if (err) {
          console.log(err);
          res.redirect("/register");
        } else {
          passport.authenticate("local")(req, res, function(){
            res.redirect("/");
          });
        }
    });
});

app.get('/logout', function(req, res){
    req.logout();
    res.redirect('/');
});


app.post('/login', (req, res) => {
    const user = new User({
            username: req.body.username,
            password: req.body.password
    });

    req.login(user, function(err){
        if (err) {
            console.log(err);
            res.redirect("/login");
        } else {
            passport.authenticate("local")(req, res, function(){
                res.redirect("/");
            });
        }
    });
});

function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }

    res.redirect('/login');
}


app.listen(3000, () => console.log('Connected on port 3000!!'));

