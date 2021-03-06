const express= require('express');
const app = express();
const path = require('path');
const morgan = require('morgan');

// settings
app.set('port',3000);
//var PORT = process.env.PORT || 3000;
app.set('views', path.join(__dirname,'views'));
app.set('view engine','ejs');

// midelwares
app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));

//Routes
app.use(require('./routes'));

//Static
app.use(express.static(path.join(__dirname, 'public')));

// 404 handler
app.use((req, res, next)=>{
    res.status(404).send('404 not found');
})

/*app.listen(PORT, function(){
    console.log("Listenning on port", PORT);
})
*/


module.exports= app;