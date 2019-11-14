var sqlite3 = require('sqlite3').verbose();  
var db = new sqlite3.Database('./mydb.db3');

// Create Table  
db.serialize(function() {  
    db.run("CREATE TABLE IF NOT EXISTS contacts(id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT,email TEXT)");  
});  

// // Insert into Table  
// db.serialize(function() {  
//     db.run("INSERT into CONTACTS(nome,email) VALUES ('Mushtaq',24)");  
//     db.run("INSERT into Users(Name,Age) VALUES ('Fazil',23)");  
// });  



// // Select All Data  
// db.serialize(function() {  
//     db.all("update Users set name = 'emanuel teste' where age = '24' ",function(err,rows){  
//         if(err)  
//                              {  
//             console.log(err);  
//         }  
//         else{  
//             console.log(rows);  
//         }  
//     });  
// }); 

// // Select All Data  
// db.serialize(function() {  
//     db.all("SELECT * from Users",function(err,rows){  
//         if(err)  
//                              {  
//             console.log(err);  
//         }  
//         else{  
//             console.log(rows);  
//         }  
//     });  
// });  

 
 
