const path = require('path');
const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
const sequelize = require('./config/connect');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

const app = express();
const port = process.env.PORT || 3001;

const sess = {
    secret: 'super secret secret',
    cookie: {
        maxAge: 3600000,
        httpOnly: true,
        secure: false,
        sameSite: 'strict',
    },
    resave: false,
    saveUninitialized: true,
    store: new SequelizeStore({
        db: sequelize
    })
};

app.use(session(sess));

const htmlRoutes = require('./controllers/htmlRoutes');
const apiRoutes = require('./controllers/api');
const isAuth = require('./utils/isAuth');

const hbs = exphbs.create({});
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(isAuth)

app.use('/api', apiRoutes);
app.use('/', htmlRoutes);


sequelize.sync({force: true}).then(()=> {
    app.listen(port, ()=> console.log('Now Listening on http://localhost:3001'))
});