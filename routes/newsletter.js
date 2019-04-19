const request = require('request');
const express = require('express');
const router  = express.Router();

router.get('/newsletter',(req, res) =>{
    res.render('newsletter')
});

router.post('/newsletter', (req, res) =>{
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

module.exports = router;