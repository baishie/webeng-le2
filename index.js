const express = require('express');
const bodyparser = require('body-parser');
const consolidate = require('consolidate');
const app = express();


app.engine('html', consolidate.nunjucks);
app.set('views', './views');
app.use(bodyparser.urlencoded({extended: true}));
app.use('/static', express.static('./static'));
app.set('views', './views');


var uName;
app.get('/', function (req,res) {
	var username = req.query.username;
	if(!username) {
		username = 'Anonymous';
	}
	return res.render ('index.html', {
		username:username
	})
})

app.post('/submit', function (req, res) {
	var username = req.body.username;
	if(!username) {
		return res.render('/profile/' + username);
	}
	else {
		res.redirect('/');
	}
})

app.get('/profile/:username', function (req,res) {
	var username = req.params.username;
	res.render ('profile.html', {
		username:username
	})
})

app.listen (3000, function () {
	console.log("Server is now running at port 3000")
})