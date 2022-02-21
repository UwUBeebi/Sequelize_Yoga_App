// connect to database
const Sequelize = require("sequelize");
const sequelize = new Sequelize('mysql://root:Qwerty123!@localhost:3306/joga_sequelize');

// read model data for table representation
const models = require('../../models')


// create new article into data table
const createArticle = (req, res) => {
	// get form data
	let name = req.body.name
	let slug = req.body.slug
	let image = req.body.image
	let body = req.body.body

	// create new article by Article model
	const newArticle = models.Article.create({
		// add values for NOT NULL fields
		// left one - data table fields
		// right one - values from form
		name: name,
		slug: slug,
		image: image,
		body: body,
		// published date generate as now()
		published: new Date().toISOString().slice(0, 19).replace('T', ' ')
	})
	.then(article => {
		console.log(article)
		return res.status(200).json({ message: 'New article is added' });
	})
	.catch (error => {
		return res.status(500).send(error.message);
	})
}

// export controller functions
module.exports = {
	createArticle
}