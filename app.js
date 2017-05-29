
var express =  require('express');
var bodyParse =  require('body-parser');
var mongoose =  require('mongoose');
var config = require('./Config.js');
var Matches = require('./Games.js');
var Deliveries = require('./Deliveries.js');

var app = express();

mongoose.connect(config.database,function(err){
	if(err){
		console.log("Error while connecting to Database  : "+err);
	}else {
		console.log("Connected To Database Successfully.")
	}
});

app.use(bodyParse.urlencoded({extended : true}));
app.use(bodyParse.json());

app.use(express.static(__dirname + '/public'));


app.get('/',function(req,res){
	res.sendFile(__dirname+ '/public/home.html');

});

app.listen(config.port,function(err){
	if(err){
		console.log(err);
	} else {
		console.log("Listening on Port 3000");
	}
});

api = express.Router();

app.use('/api',api);

api.get('/matches',function(req,res){
	var query = Matches.find({});

	query.exec(function(err,result){
		if(err){
			res.send("err : "+err);
			return;
		} 
		res.json(result);
		
	});
});

var inningArr = [];
api.post('/details',function(req,res){
	// console.log(req.body.id);
	var query = Deliveries.aggregate(
		[
			{$match:{match_id:req.body.id.toString(),inning:"1"}},
			{$group:{
				_id:{over :'$over',bowler:'$bowler',bowling_team:'$bowling_team',batting_team:'$batting_team'},extras:{$sum:'$extra_runs'},batruns:{$sum:'$batsman_runs'},
				totalRuns:{$sum:'$total_runs'}
				}
			},
			{$sort:{_id:1}}
		],
	function(err,result){
		if(err){
			res.send("err : "+err);
			return;
		} 
	inningArr.push(result);
		Deliveries.aggregate(
		[
			{$match:{match_id:req.body.id.toString(),inning:"2"}},
			{$group:{
				_id:{over :'$over',bowler:'$bowler',bowling_team:'$bowling_team',batting_team:'$batting_team'},extras:{$sum:'$extra_runs'},batruns:{$sum:'$batsman_runs'},
				totalRuns:{$sum:'$total_runs'}
				}
			},
			{$sort:{_id:1}}
		],
	function(err,result1){
		if(err){
			res.send("err : "+err);
			return;
		} 	
		inningArr.push(result1);
		res.json(inningArr);
	});

});
});