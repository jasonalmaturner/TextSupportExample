'use strict';

var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var request = require('request');

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());
// app.use('request');

app.get('/current_weather/:zip_code', function(req, res){
	var zipCode = req.param('zip_code');
	var current_weather = 'sunny';
	if(zipCode === 84601){
		current_weather = 'partly cloudy';
	}
	return res.json({current_weather: current_weather});
});

app.post('/sms/:to_number', function(req, res){
	var to = req.param('to_number');
	request.post('https://AC1afc9f309f5920e44ab887af6b56a5dc:4eccf64cb87fe21c5fd278e0fcc96342@api.twilio.com/2010-04-01/Accounts/AC1afc9f309f5920e44ab887af6b56a5dc/Messages.json',
		{
			form: {
				To: to,
				From: '+12082617136',
				Body: req.body.message
			}
		}, function(err, response, body){
			var parsedBody = JSON.parse(body);
			if(err || parsedBody.code != null){
				console.log(err);
				return res.status(parsedBody.status).json(parsedBody);
			} else {
				return res.status(200).json(parsedBody);
			}
	})
})

app.listen(9003)