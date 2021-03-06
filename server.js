const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const sgMail = require('@sendgrid/mail');

const PORT = process.env.PORT || 8080;


const app = express();



app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.set('views', './views');
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    const data = {
        person: {
            firstName: 'Danilo',
            lastName: 'Rodriguez'
        }
    }
    res.render('index', data);
});

//Visitor enters contact info
app.get('/contact', (req, res) => {
    res.render('contact');
});

//Visitor sent to /thanks upon submitting contact info
app.post('/thanks', (req, res) => {

    sgMail.setApiKey(process.env.SENDGRID_API_KEY || SENDGRID_API_KEY);
    let { email } = req.body;
    let { firstName } = req.body;
    let { lastName } = req.body;

    const msg = {
        to: 'rodriguezdanilo88@gmail.com',
        from: 'rodriguezdanilo88@gmail.com',
        subject: 'Portfolio Contacts',
        html:   `<p>Email: ${email} </p>
                <p> Name: ${firstName} ${lastName}</p>`,
    };

    sgMail.send(msg);

    res.render('thanks', { contact: req.body });
});


app.listen(PORT, () => {
    console.log('Server is listening at localhost:' + PORT)
});