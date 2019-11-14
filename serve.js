const express = require('express');
const app = express();
//
var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('./mydb.db3');
//

app.listen(3000, function () {
    console.log('server running')
})

const bodyParser = require('body-parser')
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies
app.use(bodyParser.urlencoded({ extended: true }))
var cors = require('cors')
app.use(cors())

//
app.set('view engine', 'ejs')
//
app.get('/', (reg, res) => {
    res.render('index.ejs')
})



var tools = require('./funcoes');

app.post('/show', async (req, res) => {
    tools.insertData(req.body.name, req.body.surname)
    res.redirect('/show');
});

app.get('/show', async (req, res) => {
    var lista = await tools.recoverData();
    console.log(lista);
    res.render('show.ejs', { data: lista });
});

app.route('/edit/:id').get(async (req, res) => {
    var id = req.params.id
    var rows = await tools.recoverEditData(id);
    res.render('edit.ejs', { data: rows });
})

app.get('/teste', (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify('Hello from App Engine!'));
});


//edição
app.post('/edit/:id', async (req, res) => {
    tools.editData(req);
    res.redirect('/show');
})

app.get('/showws/:Id', (req, res) => {

    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.setHeader('Content-Type', 'application/json');
    //
    (tools.recoverData(req.params.Id)).then(function (result) {
        res.send(JSON.stringify(result));
    });
})

app.post('/addctt', (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.setHeader('Content-Type', 'application/json');
    (tools.insertData(req.body.Name, req.body.Email)).then(function (result) {
    res.send(JSON.stringify(result));
    })
})

app.post('/edtctt', (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.setHeader('Content-Type', 'application/json');
   console.log(req.body.Id);
    (tools.editData(req.body.Id,req.body.Name, req.body.Email)).then(function (result) {
    res.send(JSON.stringify(result));
    })
})

app.get('/delctt/:Id', (req, res) => {
    console.log(req.params.Id)
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.setHeader('Content-Type', 'application/json');
    tools.deleteData(req.params.Id).then(function (result) {
        res.send(JSON.stringify(result));
        })
})


    //edição
    app.post('/edit/:id', async (req, res) => {
        tools.editData(req);
        res.redirect('/show');
    })

    //library
    //axios
    app.route('/delete/:id').get(async (req, res) => {
        var id = req.params.id;
        tools.deleteData(id);
        res.redirect('/show')
    })

