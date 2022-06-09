// jshint eversion:6
const express = require('express');
const bodyParser = require('body-parser');
// ejs
const ejs = require('ejs');

const app = express();

// Item variable declared(Global-Scope declaration)
let items = ['wash bowls','sweep', 'eat food']; 
let dutyItems = [];

app.set('view engine','ejs')

// Static Files
app.use(express.static('public'))

app.use(bodyParser.urlencoded({extended:true}));


app.get('/', function(req, res){

	let today = new Date();

	let options = {
		weekday:'long',
		year:'numeric',
		day:'numeric',
		month:'long'
	};
	
	let day = today.toLocaleDateString('en-US', options);//It shows realtime date

	res.render('list', {kindOfTitle: day, newListText: items}); 

});

app.post('/', function(req,res){
	let item = req.body.newText;

	if(req.body.Outline === 'Duty'){
		dutyItems.push(item);
		res.redirect('/duty');
	}
	else{
		items.push(item);
		res.redirect('/');
	}

});

app.get('/duty', function(req, res){
	res.render('list', {kindOfTitle: 'Duty List', newListText: dutyItems})
});

app.post('/duty', function(req, res){
	let item = req.body.newText;
	 dutyItems.push(item)

	 res.redirect('/duty');
})


app.listen(4000, '127.0.0.1')