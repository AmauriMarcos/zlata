const bodyParser = require('body-parser'),
      mongoose   = require('mongoose'),
      ejs        = require('ejs'),
      quizVariables = require('./quiz.js'),
      questions  = require('./quiz.js'),
      express    = require('express'),
      app        = express();


app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static('public'));

mongoose.connect('mongodb://localhost:27017/onePage', {useNewUrlParser: true});

var opcaoEscolhida;

const quizSchema = new mongoose.Schema(
    {
        question: String,
        firstOption : String,
        secondOption : String,
        thirdOption : String,
        rightAnswer : String
    }
);

const Quiz = mongoose.model('Quiz', quizSchema);


app.get('/', (req, res) => {
    res.render('home');
});


app.get('/nivelamento', (req, res) => {
     Quiz.find((err, data) => {
         
        err ? console.log (err) : res.render('nivelamento', {quizzes:data, opcaoEscolhida: opcaoEscolhida});
     });
      
});

app.post('/nivelamento', (req, res) =>{
    opcaoEscolhida = req.body.options;
    Quiz.find((err) => {
        if(err){
            console.log(err);
        } else {
            res.redirect('nivelamento');
        }
     });    
});

app.post('')

app.listen(3000, () => console.log('Connected on port 3000!!'));