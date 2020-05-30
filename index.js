const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const session = require('express-session');
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');
const route = require('./src/routes/index');
const response = require('./src/lib/response');
const app = express();
app.use(session({
    secret: 'avevgretaswdef23wef23',
    saveUninitialized: false, // don't create session exituntil something stored,
    resave: true // don't save session if unmodified
}));

app.get('/', (req, res) => {
  res.send('Hello World!')
});
app.use(cors());
app.use(bodyParser.json());
//app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({limit: "50mb"}));
app.use(bodyParser.urlencoded({limit: "50mb", extended: true, parameterLimit:50000}));
app.use(express.static(path.join(__dirname, 'public')));

// This is our route middleware
app.use('/api', routeV1);

// Error handling
app.use(response.handleError);

// Handle response
app.use(response.handleSuccess);

// Configuring the database
mongoose.connect('mongodb://phpmasters:phpmasters123@ds147073.mlab.com:47073/reg_db',{ useNewUrlParser: true}, function(err){
    if(err)
    {
        throw err;
    }
})


app.listen(8000, () => {
  console.log('Example app listening on port 8000!')
});

module.exports = app;