Session.set("ShowSignInForm", true);

Handlebars.registerHelper('arrayify',function(obj){
    result = [];
    for (var key in obj) result.push({name:key,value:obj[key]});
    return result;
});

Template.Login.events({
	'click .mtrSignIn' : function(event, template) {
		var user = {};
		user.Email = template.find(".mtrTxtEmail").value;
		user.Password = template.find(".mtrTxtPassword").value;
		if (user.Email.length && user.Password.length) {
			Meteor.call('DoLogin', user, function(error, user) {
				Session.set("MySelf", JSON.stringify(user));
				Session.set("createError", "Success!");
				Session.set("ShowSignInForm", false);
				Session.set("ShowTpltWelcome", true);
			});

		} else {
			Session.set("createError", "Your Email/Password is invalid!");
		}

	},
	'click .mtrShowSignUpForm' : function(event, template) {
		Session.set("ShowSignUpForm", true);
		Session.set("ShowSignInForm", false);
	}
});

Template.SignUp.events({
	'click .mtrSignUp' : function(event, template) {
		var user = {};
		user.FirstName = template.find(".mtrTxtFirstName").value;
		user.LastName = template.find(".mtrTxtLastName").value;
		user.DoB = template.find(".mtrTxtDoB").value;
		user.Email = template.find(".mtrTxtEmail").value;
		user.Password = template.find(".mtrTxtPassword").value;
		if (user.FirstName.length && user.DoB.length && user.Email.length
				&& user.Password.length) {
			Meteor.call('RegisterUser', user, function(error, user) {
				Session.set("createError", "Success!");
				Session.set("ShowSignUpForm", false);
			});

		} else {
			Session.set("createError", "Error while registrations!");
		}

	},
	'click .mtrShowSignInForm' : function(event, template) {
		Session.set("ShowSignUpForm", false);
		Session.set("ShowSignInForm", true);
	}
});

Template.Welcome.MySelf = function() {
	return JSON.parse(Session.get("MySelf"));
};
Template.Login.error = function() {
	return Session.get("createError");
};
Template.SignUp.error = function() {
	return Session.get("createError");
};
Template.Body.showSignUpForm = function() {
	return Session.get("ShowSignUpForm");
};
Template.Body.showSignInForm = function() {
	return Session.get("ShowSignInForm");
};
Template.Body.showTpltWelcome = function() {
	return Session.get("ShowTpltWelcome");
};