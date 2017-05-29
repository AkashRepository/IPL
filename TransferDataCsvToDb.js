/*
	Program to save csv data to MongoDB Collection.
*/
var fs =  require('fs');
var csv = require('fast-csv');

var db = require('mongodb');
// var stream = fs.createReadStream("matches.csv");
 
var stream = fs.createReadStream("deliveries.csv");
 stream.on('error', function(err) {
    console.log(err);
  });



var lineReader = require('readline').createInterface({
  input: stream
});


var count = 1;
var titleArr = [];
var gameArr = [];
lineReader.on('line', function (line,callback) {
	// count =1 for fetching the title value as key in Mongo Bson.
	if(count==1){
		var splitLine = line.split(',');
		for(var a = 0 ; a< splitLine.length; a++){
			titleArr.push(splitLine[a]);
		}
	} else {
		// count !=1 for fetching the values as value in Mongo Bson.
	
		var splitLine = line.split(',');
		var gameObj = {};
		for(var a = 0 ; a< titleArr.length; a++){
			if(titleArr[a].toString().indexOf("_runs")!=-1||titleArr[a].toString().indexOf("over")!=-1||titleArr[a].toString().indexOf("ball")!=-1){
				gameObj[titleArr[a]]=parseInt(splitLine[a]);
			} else {
				gameObj[titleArr[a]]=splitLine[a];
			}
		}
		gameArr.push(gameObj);
		// console.log(count);
	}
	count++;
	}).on('close',function(){
		db.MongoClient.connect("mongodb://localhost:27017/IPL",function(error,db){
		if (error) {
			console.log(error);
			process.exit(1);
		}
		console.log('Connection successful.')

		//Code to save Matches aur deliveries .csv data to MongoDB IPL schema.

		// saved in batches of 1000 for large number of records.

		for(var a =0;a<gameArr.length;a=a+1000){
			var temparr = [];
			// console.log(gameArr.length);
			for(var b = a;b<(gameArr.length<a+1000?gameArr.length:a+1000);b++){
				temparr.push(gameArr[b]);
			}
		
			db.collection('deliveries').insert(temparr,function(error){
				if (error) {
					console.log(error);
					process.exit(1);
				}
				process.exit(0);
			});
		}
	});
});

