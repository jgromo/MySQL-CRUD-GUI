// const mysql = require('mysql');

// // Connection Pool
// const pool = mysql.createPool({
//     connectionLimit : 100, 
//     host            : process.env.DB_HOST,
//     port            : process.env.DB_PORT,
//     user            : process.env.DB_USER,
//     password        : process.env.DB_PASS,
//     database        : process.env.DB_NAME
// });

// View authors
// exports.viewAuthors = (req, res) => {
//     // Connect to DB 
//     pool.getConnection((err, connection) => {
//         if(err) throw err; // not connected
//         console.log('Connected as ID ' + connection.threadId);

//         // use the connection
//         connection.query('SELECT * FROM authors', (err, authors) => {
//             // When done with the connection, release it
//             connection.release();
//             if(!err){
//                 res.render('home', { authors });
//             } else {
//                 console.log(err);
//             }
//         });
//     });
// };

