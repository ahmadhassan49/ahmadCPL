const express = require('express');
const app = express();
const path  = require('path');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
dotenv.config({path: '.env'});
const session = require('express-session');
var hbs = require('hbs');

// Model
require('./models/index')

// controllers
const authen = require('./controllers/auth');
const profile = require('./controllers/profile');
const leavetable = require('./controllers/leavetable');
const createtable = require('./controllers/createleave');
const ctrlrole = require('./controllers/role');
const atten = require('./controllers/attendance');
const reg = require('./controllers/register');

// Middle ware
app.use(session({
    secret: 'i am key',
    resave: false,
    saveUninitialized: true
}))
function isAuthenticated(req,res,next){
    if(req.session.user){
        res.redirect('/dashboard');
    } else{
        next()
    }
}
function islog(req,res,next){
    if(req.session.user){
        next()
    }else {
        res.redirect('/')
    }
}

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname, 'public')));

app.set('view engine', 'hbs');
hbs.registerPartials(__dirname + '/views/partials');

app.get('/',isAuthenticated,authen.loginpage);
app.get('/dashboard',islog,authen.dashboard)
app.get('/logout',authen.logout)
app.get('/profile',islog,profile.profile)
app.get('/basic-table',islog,leavetable.basictable)
app.get('/createleave',islog,createtable.createleave)
app.get('/admin',islog,authen.admin)
app.get('/role', ctrlrole.role);
app.get('/attendance', atten.attendance);
app.get('/register',reg.register);
app.get('/alluser',reg.alluser);

app.post('/signin',authen.signin);
app.post('/login',isAuthenticated,authen.login);
app.post('/adddept',ctrlrole.adddepts);
app.post('/addrole',ctrlrole.addrole);

//making server
port = process.env.PORT
app.listen(port, ()=>{
    console.log(`server is runing at ${port}`)
})