require("dotenv").config();

const express = require('express');
const cors = require('cors');
const app = express();
const routes = require('./api/routes');
const path = require('path');
const session = require('express-session');
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
 


app.use(cors({
    origin: 'http://localhost:5173',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  }));
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.json());
app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: false,
        maxAge: 10000 * 60 * 60 * 24
    }
}))
app.use((req, res, next) => {
    if (req.session.name) {
      res.locals.isAuthenticated = true;
      res.locals.userName = req.session.name;
    } else {
      res.locals.isAuthenticated = false;
    }
    next();
  });
app.use('/public', express.static(path.join(__dirname, 'public')));

app.use('/api', routes);

app.use((req, res, next) => {
    if (res.locals.isAuthenticated) {
      next();
    } else {
      res.status(401).json({ message: 'Unauthorized' });
    }
  });

const PORT = process.env.PORT || 8081;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
