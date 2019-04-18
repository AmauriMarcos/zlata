const bodyParser = require('body-parser'),
      mongoose   = require('mongoose'),
      request    = require('request'),
      ejs        = require('ejs'),
      express    = require('express'),
      app        = express();


app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static(__dirname + '/public'));

mongoose.connect('mongodb://localhost:27017/contact_form', {useNewUrlParser: true});

const contactFormSchema = new mongoose.Schema(
    {
        name: String,
        email: String,
        telefone: Number,
        message: String
    }
)

const Contact = mongoose.model('Contact', contactFormSchema);



app.get('/', (req, res) => {   
     res.render('home');
});


app.post('/', (req, res) => {
    const contato = req.body.contact;
    Contact.create({name: contato.name, email: contato.email, telefone: contato.phone, message: contato.message}, (err) =>{
        err ? console.log(err) : console.log('Succesfully created a new contact');
    })
    res.redirect('/'); 
});


app.get('/about_me', (req, res) =>{
    res.render('about_me');
}); 

app.get('/nivelamento', (req, res) =>{
    res.render('nivelamento');
});

app.get('/newsletter',(req, res) =>{
    res.render('newsletter')
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



app.post('/failure', function(req, res){
    res.redirect('/')
})


app.get('/location', (req, res)=>{
    res.sendFile(__dirname + '/my_map.html');
});


app.listen(3000, () => console.log('Connected on port 3000!!'));

//	1Scua7qAsWSF8DZxm9uSjh2JqLEUeMGi //Tomtom API Key