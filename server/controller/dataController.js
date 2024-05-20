const mysql = require('mysql');

// Connection Pool
const pool = mysql.createPool({
    connectionLimit : 100, 
    host            : process.env.DB_HOST,
    port            : process.env.DB_PORT,
    user            : process.env.DB_USER,
    password        : process.env.DB_PASS,
    database        : process.env.DB_NAME
});

// Render view with data from multiple tables
exports.renderData = (req, res) => {
    // Fetch data from authors table
    const fetchAuthors = new Promise((resolve, reject) => {
        pool.getConnection((err, connection) => {
            if (err) {
                reject(err);
                return;
            }
            connection.query('SELECT * FROM authors', (err, authors) => {
                connection.release();
                if (err) {
                    reject(err);
                    return;
                }
                resolve(authors);
            });
        });
    });

    // Fetch data from customers table
    const fetchCustomers = new Promise((resolve, reject) => {
        pool.getConnection((err, connection) => {
            if (err) {
                reject(err);
                return;
            }
            connection.query('SELECT * FROM customer', (err, customer) => {
                connection.release();
                if (err) {
                    reject(err);
                    return;
                }
                resolve(customer);
            });
        });
    });

    // Fetch data from publishers table
    const fetchPublishers = new Promise((resolve, reject) => {
        pool.getConnection((err, connection) => {
            if (err) {
                reject(err);
                return;
            }
            connection.query('SELECT * FROM publishers', (err, publishers) => {
                connection.release();
                if (err) {
                    reject(err);
                    return;
                }
                resolve(publishers);
            });
        });
    });

    // Fetch data from subjects table
    const fetchSubjects = new Promise((resolve, reject) => {
        pool.getConnection((err, connection) => {
            if (err) {
                reject(err);
                return;
            }
            connection.query('SELECT * FROM subjects', (err, subjects) => {
                connection.release();
                if (err) {
                    reject(err);
                    return;
                }
                resolve(subjects);
            });
        });
    });

    // Fetch data from titleauthors table
    const fetchTitleauthors = new Promise((resolve, reject) => {
        pool.getConnection((err, connection) => {
            if (err) {
                reject(err);
                return;
            }
            connection.query('SELECT * FROM titleauthors', (err, titleauthors) => {
                connection.release();
                if (err) {
                    reject(err);
                    return;
                }
                resolve(titleauthors);
            });
        });
    });

    // Fetch data from titles table
    const fetchTitles = new Promise((resolve, reject) => {
        pool.getConnection((err, connection) => {
            if (err) {
                reject(err);
                return;
            }
            connection.query('SELECT * FROM titles', (err, titles) => {
                connection.release();
                if (err) {
                    reject(err);
                    return;
                }
                resolve(titles);
            });
        });
    });

    // Execute promises concurrently
    Promise.all([fetchAuthors, fetchCustomers, fetchPublishers, fetchSubjects, fetchTitleauthors, fetchTitles])
        .then(([authors, customer, publishers, subjects, titleauthors, titles]) => {
            res.render('home', { authors, customer, publishers, subjects, titleauthors, titles });
        })
        .catch(err => {
            console.error('Error fetching data:', err);
            res.status(500).send('Error fetching data');
        });
};

// Render Author Page
exports.formAuthor = (req, res) => {
    res.render('add-author');
}

// Add new author
exports.createAuthor = (req, res) => {

    const { auID, aName, email, phone} = req.body;

    // res.render('add-author');
    pool.getConnection((err, connection) => {
        if(err) throw err; // not connected
        console.log('Connected as ID ' + connection.threadId);

        // User the connection
        connection.query('INSERT INTO authors SET auID = ?, aName = ?, email = ?, phone = ?',[auID, aName, email, phone],(err, rows) => {
            // When done with the connection, release it
            connection.release();
            if(!err) {
                res.render('add-author', {alert: 'Author added successfully.'});
            } else {
                console.log(err);
            }

            console.log('The data from Authors table: \n', rows);
        });
    });
}

// Render Customer Page
exports.formCustomer = (req, res) => {
    res.render('add-customer');
}

// Add new author
exports.createCustomer = (req, res) => {

    const { custID, custName, zip, city, state} = req.body;

    // res.render('add-author');
    pool.getConnection((err, connection) => {
        if(err) throw err; // not connected
        console.log('Connected as ID ' + connection.threadId);

        // User the connection
        connection.query('INSERT INTO customer SET custID = ?, custName = ?, zip = ?, city = ?, state = ?',[custID, custName, zip, city, state],(err, rows) => {
            // When done with the connection, release it
            connection.release();
            if(!err) {
                res.render('add-customer', {alert: 'Customer added successfully.'});
            } else {
                console.log(err);
            }

            console.log('The data from Customer table: \n', rows);
        });
    });
}

// Render Publisher Page
exports.formPublisher = (req, res) => {
    res.render('add-publisher');
}

// Add new publisher
exports.createPublisher = (req, res) => {

    const { pubID, pname, email, phone} = req.body;

    // res.render('add-author');
    pool.getConnection((err, connection) => {
        if(err) throw err; // not connected
        console.log('Connected as ID ' + connection.threadId);

        // User the connection
        connection.query('INSERT INTO publishers SET pubID = ?, pname = ?, email = ?, phone = ?',[pubID, pname, email, phone],(err, rows) => {
            // When done with the connection, release it
            connection.release();
            if(!err) {
                res.render('add-publisher', {alert: 'Publisher added successfully.'});
            } else {
                console.log(err);
            }

            console.log('The data from Publishers table: \n', rows);
        });
    });
}

// Render Subjects Page
exports.formSubject = (req, res) => {
    res.render('add-subject');
}

// Add new Subject
exports.createSubject = (req, res) => {

    const { subID, sName} = req.body;

    // res.render('add-author');
    pool.getConnection((err, connection) => {
        if(err) throw err; // not connected
        console.log('Connected as ID ' + connection.threadId);

        // User the connection
        connection.query('INSERT INTO subjects SET subID = ?, sName = ?',[subID, sName],(err, rows) => {
            // When done with the connection, release it
            connection.release();
            if(!err) {
                res.render('add-subject', {alert: 'Subject added successfully.'});
            } else {
                console.log(err);
            }

            console.log('The data from Subjects table: \n', rows);
        });
    });
}

// Render Titleauthors Page
exports.formTitleauthors = (req, res) => {
    res.render('add-titleauthor');
}

// Add new Titleauthors
exports.createTitleauthors = (req, res) => {

    const { titleID, auID, importance } = req.body;

    // res.render('add-titleauthor');
    pool.getConnection((err, connection) => {
        if(err) throw err; // not connected
        console.log('Connected as ID ' + connection.threadId);

        // User the connection
        connection.query('INSERT INTO titleauthors SET titleID = ?, auID = ?, importance = ?',[titleID, auID, importance],(err, rows) => {
            // When done with the connection, release it
            connection.release();
            if(!err) {
                res.render('add-titleauthor', {alert: 'Titleauthor added successfully.'});
            } else {
                console.log(err);
            }

            console.log('The data from Titleauthors table: \n', rows);
        });
    });
}

// Render Titles Page
exports.formTitles = (req, res) => {
    res.render('add-titles');
}

// Add new Titles
exports.createTitles = (req, res) => {

    const { titleID, title, pubID, subID, pubDate, cover, price } = req.body;

    // res.render('add-titles');
    pool.getConnection((err, connection) => {
        if(err) throw err; // not connected
        console.log('Connected as ID ' + connection.threadId);

        // User the connection
        connection.query('INSERT INTO titles SET titleID = ?, title = ?, pubID = ?, subID = ?, pubDate = ?, cover = ?, price = ?',[titleID, title, pubID, subID, pubDate, cover, price],(err, rows) => {
            // When done with the connection, release it
            connection.release();
            if(!err) {
                res.render('add-titleauthor', {alert: 'Title added successfully.'});
            } else {
                console.log(err);
            }

            console.log('The data from Titles table: \n', rows);
        });
    });
}

// Edit Authors Table
exports.editAuthor = (req, res) => {
    pool.getConnection((err, connection) => {
        if(err) throw err; // not connected
        console.log('Connected as ID ' + connection.threadId);
        // User the connection
        connection.query('SELECT * FROM authors WHERE auID = ?',[req.params.id], (err, rows) => {
            // When done with the connection, release it
            connection.release();
            if(!err) {
                res.render('edit-author', { rows });
            } else {
                console.log(err);
            }

            console.log('The data from Authors table: \n', rows);
        });
    });
}

// Update Authors Table
exports.updateAuthor = (req, res) => {
    const { auID, aName, email, phone} = req.body;
    pool.getConnection((err, connection) => {
        if(err) throw err; // not connected
        console.log('Connected as ID ' + connection.threadId);
        // User the connection
        connection.query('UPDATE authors SET auID = ?, aName = ?, email = ?, phone = ? WHERE auID = ?',[auID, aName, email, phone, req.params.id], (err, rows) => {
            // When done with the connection, release it
            connection.release();
            if(!err) {
                
                pool.getConnection((err, connection) => {
                    if(err) throw err; // not connected
                    console.log('Connected as ID ' + connection.threadId);
                    // User the connection
                    connection.query('SELECT * FROM authors WHERE auID = ?',[req.params.id], (err, rows) => {
                        // When done with the connection, release it
                        connection.release();
                        if(!err) {
                            res.render('edit-author', { rows, alert: `${aName} has been updated.` });
                        } else {
                            console.log(err);
                        }
            
                        console.log('The data from Authors table: \n', rows);
                    });
                });

            } else {
                console.log(err);
            }

            console.log('The data from Authors table: \n', rows);
        });
    });
}

// Edit Customers Table
exports.editCustomer = (req, res) => {
    pool.getConnection((err, connection) => {
        if(err) throw err; // not connected
        console.log('Connected as ID ' + connection.threadId);
        // User the connection
        connection.query('SELECT * FROM customer WHERE custID = ?',[req.params.id], (err, rows) => {
            // When done with the connection, release it
            connection.release();
            if(!err) {
                res.render('edit-customer', { rows });
            } else {
                console.log(err);
            }

            console.log('The data from Customers table: \n', rows);
        });
    });
}

// Update Customer Table
exports.updateCustomer = (req, res) => {
    const { custID, custName, zip, city, state} = req.body;
    pool.getConnection((err, connection) => {
        if(err) throw err; // not connected
        console.log('Connected as ID ' + connection.threadId);
        // User the connection
        connection.query('UPDATE customer SET custID = ?, custName = ?, zip = ?, city = ?, state = ? WHERE custID = ?',[custID, custName, zip, city, state, req.params.id], (err, rows) => {
            // When done with the connection, release it
            connection.release();
            if(!err) {
                
                pool.getConnection((err, connection) => {
                    if(err) throw err; // not connected
                    console.log('Connected as ID ' + connection.threadId);
                    // User the connection
                    connection.query('SELECT * FROM customer WHERE custID = ?',[req.params.id], (err, rows) => {
                        // When done with the connection, release it
                        connection.release();
                        if(!err) {
                            res.render('edit-customer', { rows, alert: `${custName} has been updated.` });
                        } else {
                            console.log(err);
                        }
            
                        console.log('The data from Customers table: \n', rows);
                    });
                });

            } else {
                console.log(err);
            }

            console.log('The data from Customers table: \n', rows);
        });
    });
}

// Delete Authors Table
exports.deleteAuthor = (req, res) => {
    pool.getConnection((err, connection) => {
        if(err) throw err; // not connected
        console.log('Connected as ID ' + connection.threadId);
        // User the connection
        connection.query('DELETE FROM authors WHERE auID = ?',[req.params.id], (err, rows) => {
            // When done with the connection, release it
            connection.release();
            if(!err) {
                res.redirect('/');
            } else {
                console.log(err);
            }

            console.log('The data from Authors table: \n', rows);
        });
    });
}
