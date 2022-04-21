const{v4 : uuidv4} = require("uuid")
require('dotenv').config();
const nodemailer =require('nodemailer');
const bcrypt = require('bcrypt');
const randtoken = require('rand-token');
const mysql = require("mysql")
const db=mysql.createConnection({
    host:process.env.DATABASE_HOST,
    user:process.env.DATABASE_USER,
    password:process.env.DATABASE_PASSWORD,
    database:process.env.DATABASE

})

// var express = require('express');
// var router = express.Router();
// var connection = require('../database.js');
// var nodemailer = require('nodemailer');


//send email
function sendEmail(email, token) {
    let email = email;
    let token = token;
    let mail = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 's12029171@stu.najah.edu',
            pass: 'neu@544346',
        }
});

let mailOptions = {
    from: 's120249171@stu.najah.edu',
    to: `${email}`,
    subject: 'Reset Password ',
    html: '<p>You requested for reset password, kindly use this <a href="/forgot_pass' + token + '">link</a> to reset your password</p>'
};

mail.sendMail(mailOptions, function(error, info) {
    if (error) {
        console.log('error occurs' + error)
        } else {
        console.log('Reset Password done?')
    }
});
}

/* home page *//////////////
router.get('/', function(req, res, next) {
    res.render('index', {
        title: 'Forgot Password Page'
});
});
/* send reset password link in email */
router.post('/reset-password-email', function(req, res, next) {
    let email = req.body.email;
    
//console.log(sendEmail(email, fullUrl));
db.query('SELECT * FROM users WHERE email ="' + email + '"', function(err, result) {
    if (err) throw err;
    let type = ''
    let msg = ''
    console.log(result[0]);
    if (result[0].email.length > 0) {
        let token = randtoken.generate(20);
        let sent = sendEmail(email, token);
        if (sent != '0') {
            let data = {
                token: token
}
db.query('UPDATE users SET ? WHERE email ="' + email + '"', data, function(err, result) {
    if(err) throw err
})

type = 'success';
msg = 'The reset password link has been sent to your email address';
} else {
    type = 'error';
    msg = 'Something goes to wrong. Please try again';
}
} else {

console.log('2');
type = 'error';
msg = 'The Email is not registered with us';
}
req.flash(type, msg);
res.redirect('/');
});
})
/* reset page */
router.get('/reset-password', function(req, res, next) {
    res.render('reset-password', {
        title: 'Reset Password Page',
        token: req.query.token
});
});
/* update password to database */
router.post('/update-password', function(req, res, next) {
    let token = req.body.token;
    let password = req.body.password;
    connection.query('SELECT * FROM users WHERE token ="' + token + '"', function(err, result) {
        if (err) throw err;
        let type
        let msg
         if (result.length > 0) {
            let saltRounds = 10;
// var hash = bcrypt.hash(password, saltRounds);
bcrypt.genSalt(saltRounds, function(err, salt) {
    bcrypt.hash(password, salt, function(err, hash) {
        let data = {
            password: hash
}

connection.query('UPDATE users SET ? WHERE email ="' + result[0].email + '"', data, function(err, result) {
    if(err) throw err
});
});
});
type = 'success';
msg = 'Your password has been updated successfully';
} else {
    console.log('2');
    type = 'success';
    msg = 'Invalid link; please try again';
}

req.flash(type, msg);
res.redirect('/');
});
})
module.exports = router;