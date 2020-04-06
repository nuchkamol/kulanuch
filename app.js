const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const logger = require('morgan');
const fs = require('fs');
const mime = require('mime-types');
const cors=require('cors');
var cons = require('consolidate');
const session = require('express-session');

const index = require('./controllers/controller');
const constants = require('./constants');

let port = constants.PORT;
let pathFiles = constants.PATHFILES;

const app = express();
// view engine setup
const PORT = port || 3000;

app.use(session({
  key: 'username',
  secret: "aissuperwifi",
  resave: false,
  saveUninitialized: false,
  cookie: {
      expires: 600000
  } // expires 1 hour
}));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(cors({origin:true,credentials: true}));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
  res.setHeader('Access-Control-Allow-Headers', 'content-type , x-access-token');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();

})

app.engine('html', cons.swig)
app.set('view engine', 'html');

app.get('/', index.renderLogin)
app.get('/manageuser', index.renderLogin)
app.get('/manageroom', index.renderLogin)
app.get('/addcustomers', index.renderLogin)
app.get('/addroom', index.renderLogin)
app.post("/insertRoom", index.insertRoomService);
app.post("/selectRoom", index.selectRoomService);
app.post("/insertCustomer", index.insertCustomerService);
app.post("/selectCustomer", index.selectCustomerService);
app.post("/updateRoom" , index.updateRoomService);
app.get('/*', (req, res, next) => {
  //  console.log("pathFiles  >>>"+pathFiles);
  //  console.log("req.path >>>"+ req.path);
  const fileToLoad = fs.readFileSync(pathFiles + req.path);
  
  const mimeType = mime.contentType(fileToLoad);

  console.log("fileToLoad + >>>"+pathFiles + req.path  );
  console.log(" + mimeType >>>"+ mimeType);
  res.writeHead(200, { 'Content-Type': mimeType });
  res.end(fileToLoad, 'binary');


})


// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});


module.exports = app;
