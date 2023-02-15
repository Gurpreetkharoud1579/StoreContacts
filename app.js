const express = require('express');
const path = require('path');
const port = 2700;
const bodyParser = require('body-parser');

const db = require('./config/mongoose.js')
const Contact = require('./model/contact.js');

const app = express();
//middleware for using public directory as default 
app.use(express.static(__dirname + '/public'));

// middleware for decoding request data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


// MVC 
// for View using ejs
// for model using db (Mongo) configuration is in config folder and models in model folder 
// for controller using it app.js for a while 

// set the view engine to ejs (ejs is like react and other view engines)
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname + '/views'));

app.listen(port, () => {
    console.log("App is running on port", port);
    console.log("New path is", path.join(__dirname + '/views'));
})

app.get('/contacts', (req, res) => {
    Contact.find({}, (err, contactList) => {
        if (err) {
            console.log("Error getting contacts", err);
            return;
        } else {
            return res.render('contacts', {
                title: "Contact List",
                contact_list: contactList
            });
        }
    });

});
app.get('/home', (req, res) => {
    return res.render('home', {
        title: "Home"
    });
});

app.post('/addContact', (req, res) => {

    Contact.create({
        name: req.body.name,
        phone: req.body.phone,
        email: req.body.email,
        address: req.body.address
    }, (err, newContact) => {
        if (err) {
            console.log("Error creating new contact", err);
            return;
        } else {
            console.log("New contact added successfully", newContact);
        }
    });
    return res.redirect('back')
});

app.get('/deleteContact/:id', (req, res) => {
    let id = req.params.id;

    Contact.findOneAndDelete({ "_id": id }, (err, contact) => {
        if (err) {
            console.log("Error deleting the contact");
            return;
        } else {
            return res.redirect('/contacts');
        }
    })

});