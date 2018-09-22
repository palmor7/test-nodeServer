const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view-engine', 'hbs');


app.use((req, res, next) => {
	var now = new Date().toString();
	var log = `${now} , ${req.method} , ${req.url}`;
	console.log(log);
	fs.appendFile('server.log', log + '\n', (err)=>{
		if(err) console.log('Error in appendFile()');
	});
	next();
});

// app.use((req, res, next) => {
// 	res.render('maintenance.hbs');
// });

app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear', ()=>{
	return new Date().getFullYear();
});
hbs.registerHelper('screamIt', (text)=>{
	return text.toUpperCase();
});

app.get('/', (req, res) => {
	res.render('home.hbs', {
		welcomeMessage: 'Welcome to myWebsite',
		pageTitle: 'Home Page'
	});
	
});

app.get('/about', (req, res) => {
	res.render('about.hbs', {
		pageTitle: 'About Page'
	});
	
});

app.get('/bad', (req, res) => {
	res.send({
		errorMessage: 'Error handling the request.'
	});
	
});

const port = process.env.PORT || 3000 ;
app.listen(3000, ()=>{
	console.log(`Listen to port ${port}...`);
});