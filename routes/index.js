const express = require('express');
const router  = express.Router();

router.get('/', (req, res) => {   
    res.render('home');
});


router.post('/', (req, res) => {
   const contato = req.body.contact;
   Contact.create({name: contato.name, email: contato.email, telefone: contato.phone, message: contato.message}, (err) =>{
       err ? console.log(err) : console.log('Succesfully created a new contact');
   })
   res.redirect('/'); 
});


router.get('/about_me', (req, res) =>{
   res.render('about_me');
}); 

router.get('/nivelamento', (req, res) =>{
   res.render('nivelamento');
});




router.post('/failure', function(req, res){
   res.redirect('/')
})


router.get('/location', (req, res)=>{
   res.sendFile(__dirname + '/my_map.html');
});

module.exports = router;