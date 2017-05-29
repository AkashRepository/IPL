var mongoose =  require('mongoose');

var DeliveriesSchema = new mongoose.Schema({

	match_id : {type : String, required: true},
	inning : {type : String, maxlength: 25},
	batting_team : {type : String, maxlength: 25},
	bowling_team : {type : String, maxlength: 25},
	over : {type : Number, maxlength: 25},
	ball : {type : Number, maxlength: 25},
	batsman  : {type : String, maxlength: 25},
	non_striker : {type : String, maxlength: 25},
	bowler : {type : String, maxlength: 20},
	is_super_over : {type : String, maxlength: 10},
	wide_runs :{type : Number, maxlength: 25},
	bye_runs : {type : Number},
	legbye_runs : {type : Number},
	noball_runs : {type : Number, maxlength: 25},
	penalty_runs :{type : Number, maxlength: 25},
	batsman_runs : {type : Number, maxlength: 25},
	extra_runs : {type : Number, maxlength: 25},
	total_runs : {type : Number, maxlength: 25},
	player_dismissed : {type : String, maxlength: 25},
	dismissal_kind : {type : String, maxlength: 25},
	fielder : {type : String, maxlength: 25},
});

module.exports = mongoose.model('Deliveries', DeliveriesSchema);	