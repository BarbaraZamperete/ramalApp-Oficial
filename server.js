const express = require('express');
const path = require('path');
const app = express();
const { engine } = require('express-handlebars');
const expressHbs = require('express-handlebars');
const session = require('express-session');
const flash = require("connect-flash");
const { ppid } = require('process');
const { networkInterfaces } = require('os');

const passport = require('passport');

app.engine('.hbs', engine({extname: '.hbs'}));
app.set('view engine', '.hbs');
app.set('views', './views');



//static file
app.use(express.static(path.join(__dirname, 'public')));

//midlewares
app.use(express.urlencoded({extended: false}));
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true,
}));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());



//Global Variable
app.use((req, res, next) => {
    res.locals.success_msg = req.flash('success_msg')
    res.locals.alert_msg = req.flash('alert_msg')
    res.locals.user = req.user||null
    next()
})

const hbs = expressHbs.create({});
hbs.handlebars.registerHelper('ifEquals', function(e1, e2, opts){
    if (e1 == e2) {
        return opts.fn(this);
    }else{
        return opts.inverse(this);
    }
})
hbs.handlebars.registerHelper('ifNotEquals', function(e1, e2, opts){
    if (e1 != e2) {
        return opts.fn(this);
    }else{
        return opts.inverse(this);
    }
})

app.use(require('./routes/index.routes'));
app.use(require('./routes/ramal.routes'));
app.use(require('./routes/servidores.routes'));
app.use(require('./routes/setores.routes'));
app.use(require('./routes/user.routes'));



module.exports = app;