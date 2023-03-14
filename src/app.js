const express = require('express');
const mainRouter = require('./routes/main');
const methodOVerride = require('method-override')
const session = require('express-session'); 
const cookieParser = require("cookie-parser");

const app = express();

app.use(cookieParser ())
app.use(session({ secret: "It's a secret" , resave: false, saveUninitialized: false, }));
app.use(methodOVerride('_method'))
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.set('view engine', 'ejs');
app.set('views', 'src/views');

app.use('/', mainRouter);

app.listen(3000, () => {
  console.log('listening in http://localhost:3000');
});
