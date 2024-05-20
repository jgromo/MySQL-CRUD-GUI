
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

// // View Customers
// exports.viewCustomers = (req, res) => {
//     // Connect to DB 
//     pool.getConnection((err, connection) => {
//         if(err) {
//             console.error('Error connecting to database:', err);
//             throw err; // not connected
//         }
//         console.log('Connected as ID ' + connection.threadId);

//         // use the connection
//         connection.query('SELECT * FROM customer', (err, customer) => {
//             // When done with the connection, release it
//             connection.release();
//             if(err){
//                 console.error('Error executing query:', err);
//                 throw err;
//                 // res.render('home', { customer });
//             }
//             console.log('Retrieved customer data:', customer);
//             if(!err){
//                 res.render('home', { customer });
//             } else {
//                 console.log(err);
//             }
//         });
//     });
// };
