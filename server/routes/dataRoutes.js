const express = require('express');
const router = express.Router();
const dataController = require('../controller/dataController');

// Render view with data from multiple tables
router.get('/', dataController.renderData);
// Add Data
router.get('/addauthor', dataController.formAuthor);
router.post('/addauthor', dataController.createAuthor);
router.get('/addcustomer', dataController.formCustomer);
router.post('/addcustomer', dataController.createCustomer);
router.get('/addpublisher', dataController.formPublisher);
router.post('/addpublisher', dataController.createPublisher);
router.get('/addsubject', dataController.formSubject);
router.post('/addsubject', dataController.createSubject);
router.get('/addtitleauthors', dataController.formTitleauthors);
router.post('/addtitleauthors', dataController.createTitleauthors);
router.get('/addtitles', dataController.formTitles);
router.post('/addtitles', dataController.createTitles);
// Edit Data
router.get('/editauthor/:id', dataController.editAuthor);
router.post('/editauthor/:id', dataController.updateAuthor);
router.get('/editcustomer/:id', dataController.editCustomer);
router.post('/editcustomer/:id', dataController.updateCustomer);
// Delete Data
router.get('/:id', dataController.deleteAuthor);
// router.get('/:id', dataController.deleteCustomer);
// router.get('/:id', dataController.deletePublisher);
// router.get('/:id', dataController.deleteSubject);
// router.get('/:id', dataController.deleteData);


module.exports = router;