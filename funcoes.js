const express = require('express')
const app = express()

const bodyParser = require('body-parser')
//
var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('./mydb.db3');
//

let insertData = function (name, email) {
    return new Promise((resolve, reject) => {
        verificardatainsert(name, email).then(function (result) {
            lista = result;
            if (lista.length > 0) {
                resolve('Objetos já inseridos.');
            } else {
                db.run(`INSERT INTO contacts(name,email) VALUES ('${name}','${email}')`);
                resolve('Dados inseridos com sucesso!');
            }
        });
    })
};

let editData = function (id, name, email) {
    return new Promise((resolve, reject) => {
        verificardatainsert(name, email).then(function (result) {
            lista = result;
            if (lista.length > 0) {
                resolve('Objetos já inseridos.');
            } else {
                let sql = `update contacts set name = '${name}', email = '${email}' where id = '${id}'`;
                db.run(sql);
                resolve('Dados alterados com sucesso!');
            }
        });
    })
};


//
let deleteData = function (id) {
    return new Promise((resolve, reject) => {
        db.run(`delete from contacts where id = '${id}'`);
        resolve('Dados excluídos com sucesso!');
    })
};

var recoverData = function (id) {
    return new Promise((resolve, reject) => {
        var data = [];
        let sql;
        if (id > 0) {
            sql = `SELECT id,name,email FROM contacts 
        where id = ${id}`;
        } else {
            sql = `SELECT DISTINCT id,name,email FROM contacts
        ORDER BY name`;
        }


        db.all(sql, [], (err, rows) => {
            if (err) {
                return console.error(err.message);
            }
            rows.forEach((row) => {
                data.push(row);
            });
            resolve(data);
        })
    })
};

let verificardatainsert = function (name, email) {
    return new Promise((resolve, reject) => {
        var data = [];
        let sql = `SELECT id FROM contacts where (name = '${name}' and email = '${email}') or (name = '${name}' or email = '${email}')`;
        db.all(sql, [], (err, rows) => {
            if (err) {
                return console.error(err.message);
            }
            rows.forEach((row) => {
                data.push(row);
            });
            resolve(data);
        })
    })
}


// let editData = function (req) {
//     var id = req.params.id;
//     var name = req.body.name;
//     var email = req.body.email;

//     let sql = `update contacts set name = '${name}', email = '${email}' where id = '${id}'`;
//     db.run(sql);
// };

let recoverEditData = function (id) {
    return new Promise((resolve, reject) => {
        var data = [];
        let sql = `SELECT id,name,email FROM contacts where id = '${id}'`;
        db.all(sql, [], (err, rows) => {
            if (err) {
                return console.error(err.message);
            }
            rows.forEach((row) => {
                data.push(row);
            });
            resolve(data);
        })
    })
};



//
exports.insertData = insertData;
exports.recoverData = recoverData;
exports.editData = editData;
exports.recoverEditData = recoverEditData;
exports.deleteData = deleteData