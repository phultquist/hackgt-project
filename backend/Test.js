import express from 'express';
import nodemailer from 'nodemailer';
// var nodemailer = require('nodemailer');
const app = express();

app.get("/", async (req, res) => {


    let testAccount = await nodemailer.createTestAccount();

    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
      host: "main.traversymedia.com",
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: 'test@traversymedia.com', // generated ethereal user
        pass: testAccount.pass, // generated ethereal password
      },
    });
  
    // send mail with defined transport object
    let info = await transporter.sendMail({
      from: '"Fred Foo 👻" <foo@example.com>', // sender address
      to: "bar@example.com, baz@example.com", // list of receivers
      subject: "Hello ✔", // Subject line
      text: "Hello world?", // plain text body
      html: "<b>Hello world?</b>", // html body
    });
  
    console.log("Message sent: %s", info.messageId);
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
  
    // Preview only available when sending through an Ethereal account
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
  });
  









//     var transporter = nodemailer.createTransport({
//         service: 'gmail',
//         auth: {
//             user: 'hackgtncr@yahoo.com',
//             pass: 'hackathontechncr'
//         }
//     });

//     var mailOptions = {
//         from: 'hackgtncr@yahoo.com',
//         to: 'hackgtncr@yahoo.com',
//         subject: 'Sending Email using Node.js',
//         text: 'There is an issue with one of your vending machines. Please send people to look over.'
//     };

//     transporter.sendMail(mailOptions, function (error, info) {
//         if (error) {
//             console.log(error);
//         } else {
//             console.log('Email sent: ' + info.response);
//         }
//     });
    
//     res.send("success");
// });

// app.listen(5000, () => console.log('Application is running'));
