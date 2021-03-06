const express = require("express");
const app = express();

// parse requests of content-type - application/json
app.use(express.json());
// parse request of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// connect to database
const Sequelize = require("sequelize");
const sequelize = new Sequelize('mysql://root:Qwerty123!@localhost:3306/joga_sequelize');

// testing connection
sequelize
	.authenticate()
	.then(() => {
		console.log('Connected to the database');
	})
	.catch(err => {
		console.error('Unable to connect to the database', err);
	});

// using routes and controllers
const articleRouter = require('./routes/article');
const authorRouter = require('./routes/author');
const apiRouter = require('./routes/api');
app.use('/', articleRouter);
app.use('/article', articleRouter);
app.use('/author', authorRouter);
app.use('admin/article', articleRouter);
app.use('/api', apiRouter);

// listen request
app.listen(8080, () => {
	console.log('Server is running on http://localhost:8080');
}); 