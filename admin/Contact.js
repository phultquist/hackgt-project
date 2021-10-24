import emailjs from 'emailjs-com'
import express, { application } from 'express'

const app = express()

app.get('API/catalog', (req,res) => {
    
});

// export default function Contact() {

// const sendEmail = (e) => {
//     e.preventDefault();

//     emailjs.sendForm('gmail', 'template_kr28u7o', e.target, 'user_pfwlAKw00L6NSkcO220ui')
//       .then((result) => {
//           console.log(result.text);
//       }, (error) => {
//           console.log(error.text);
//       });
//   };
// }