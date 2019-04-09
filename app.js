const bodyParser = require('body-parser'),
      mongoose   = require('mongoose'),
      ejs        = require('ejs'),
      express    = require('express'),
      app        = express();


app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static('public'));

mongoose.connect('mongodb://localhost:27017/onePage', {useNewUrlParser: true});

const quizSchema = new mongoose.Schema(
    {
        question: String,
        firstOption : String,
        secondOption : String,
        thirdOption : String
    }
);

const Quiz = mongoose.model('Quiz', quizSchema);

// Quiz.create({question: 'When do you study?', 
//               firstOption:'at school',
//               secondOption:'in the evenings',
//               thirdOption:'in the library'}, (err) => {
//                 if(err){
//                     console.log(err);
//                 }else{
//                     console.log('Succesfully created a new question!');
//                 }
//  });




app.get('/', (req, res) => {
    res.render('home');
});


app.get('/nivelamento', (req, res) => {
    Quiz.find((err, allQuizzes) => {
        if (err){
            console.log(err);
        } else {  

           res.render('nivelamento', {allQuizzes: allQuizzes});
        };
    });
});

app.listen(3000, () => console.log('Connected on port 3000!!'));