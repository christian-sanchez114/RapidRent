'use strict';

var nodemailer = require("nodemailer");

/*
    configure SMTP Server details.
*/
var smtpTransport = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    auth: {
        user: "",
        pass: ""
    }
});
var rand,mailOptions,host,link;


exports.send=function(req,res){
  rand=Math.floor((Math.random() * 100) + 54);
    host=req.get('host');
    console.log('host:',host)
    link="http://"+req.get('host')+"/api/verify?id="+rand;
    // mailOptions={
    //     to : req.query.to,
    //     subject : req.query.subject,
    //     text : req.query.text
    // }
    mailOptions={
        to : req.body.to,
        subject : "Please confirm your Email account",
        html : "Hello,<br> Please Click on the link to verify your email.<br><a href="+link+">Click here to verify</a>" 
    }
    console.log(mailOptions);
    smtpTransport.sendMail(mailOptions, function(error, response){
     if(error){
            console.log(error);
        res.end("error");
     }else{
            console.log("Message sent: " + response.message);
        res.end("sent");
         }
  });
};


// app.get('/verify',
  exports.verify=function(req,res){
console.log(req.protocol+":/"+req.get('host'));
if((req.protocol+"://"+req.get('host'))==("http://"+host))
{
    console.log("Domain is matched. Information is from Authentic email");
    if(req.query.id==rand)
    {
        console.log("email is verified");
        res.end("<h1>Email "+mailOptions.to+" is been Successfully verified");
    }
    else
    {
        console.log("email is not verified");
        res.end("<h1>Bad Request</h1>");
    }
}
else
{
    res.end("<h1>Request is from unknown source");
}
};