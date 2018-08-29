var express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const api = require('./server/routes/api.ts');
const cors = require('cors');
const app = express();

app.set('port', process.env.PORT || 3000);
/*app.engine('html', require('ejs').renderFile);
app.set('view engine', 'ejs');*/

app.use(express.static(path.join(__dirname, 'dist')));
app.use(cors());
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use('/api', api);
app.get('*',(req,res)=> {
    res.sendFile(path.join(__dirname,'dist/index.html'));
});



app.listen(app.get('port'), function(){
    console.log('Listening on port 3000');
});