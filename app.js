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
        answers : [
            {first: String},
            {second: String},
            {third: String}
        ]
    }
);

const Quiz = mongoose.model('Quiz', quizSchema);

// Quiz.create({question: 'Onde tem mais mosquitos?'},
//            {answers: [{first :'Chile'},
//                       {second:'Sérvia'}, 
//                        {third:'Brasil'}] }, (err) => {
//                            err ? console.log(err) : console.log('Succesfully added to onePageDB');
//                        });





app.get('/', (req, res) => {
    res.render('home');
});


app.get('/nivelamento', (req, res) => {
    Quiz.find((err, allQuizzes) => {
        if (err){
            console.log(err);
        } else {  
            for(var i = 0; i < allQuizzes.length; i++){
                const answer  = allQuizzes[i][1];
                console.log(answer);
            };                       
            

           res.render('nivelamento', {questions: allQuizzes});
        };
    });
});

app.listen(3000, () => console.log('Connected on port 3000!!'));