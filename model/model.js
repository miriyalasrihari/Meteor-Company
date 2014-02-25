Users = new Meteor.Collection("Users");

UserIds = new Meteor.Collection("UserIds");

UserIds._collection._ensureIndex({
	created : 1
}, {
	expireAfterSeconds : 3600
});
var NonEmptyString = Match.Where(function(x) {
	check(x, String);
	return x.length !== 0;
});

Meteor.methods({
	DoLogin : function(options) {
		check(options, {
			Email : NonEmptyString,
			Password : NonEmptyString
		});
		return Users.findOne(options);
	},
	RegisterUser : function(options) {
		check(options, {
			FirstName : NonEmptyString,
			LastName : NonEmptyString,
			DoB : NonEmptyString,
			Email : NonEmptyString,
			Password : NonEmptyString
		});
		options.UserId = UserIds.insert({
			Date : new Date()
		});
		return Users.insert(options);
	},
	GetUserById : function(options) {
		check(options, {
			UserId : NonEmptyString
		});
		return Users.findOne({
			UserId : options.UserId
		});
	}

});
