/**
 * Created by Yun on 1/23/2018.
 */
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const session = require('express-session');

const logger = require('morgan');

const app = express();

app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(logger('dev'));


app.get('*', function(req, res) {
  res.render('index');
});
const port = process.env.PORT || 3000;
app.listen(port, function() {
  console.log(`web-server running on localhost:${port}`);
});