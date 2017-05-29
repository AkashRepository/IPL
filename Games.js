var mongoose =  require('mongoose');

var MatchSchema = new mongoose.Schema({
	id : {type : Number, required: true},
	season : {type : String, maxlength: 140,required: true},
	city : {type : String, maxlength: 140,required: true},
	date : {type : String, maxlength: 140},
	team1 : {type : String, maxlength: 140,required: true},
	team2 : {type : String, maxlength: 140,required: true},
	toss_winner  : {type : String, maxlength: 140},
	toss_decision : {type : String, maxlength: 140},
	result : {type : String, maxlength: 20},
	dl_applied : {type : Number, maxlength: 10},
	winner :{type : String, maxlength: 140},
	win_by_runs : {type : Number},
	win_by_wickets : {type : Number},
	player_of_match : {type : String, maxlength: 140},
	venue :{type : String, maxlength: 140},
	umpire1 : {type : String, maxlength: 140},
	umpire2 : {type : String, maxlength: 140},
	umpire3 : {type : String, maxlength: 140}
});

module.exports = mongoose.model('Matches', MatchSchema);