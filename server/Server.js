ServerSessions = new Meteor.Collection('server_sessions');

Meteor.publish('server_sessions', function(obj) {
	var created = new Date().getTime(), id = obj.ID, userId = obj.UserId;

	if (!id && userId) {
		id = ServerSessions.insert({
			created : created,
			UserId : userId
		});
	}

	var serverSession = ServerSessions.find({
		_id : id,
		UserId : userId
	});

	if (serverSession.count() === 0) {
		id = ServerSessions.insert({
			created : created,
			UserId : userId
		});
		serverSession = ServerSessions.find({
			_id : id,
			UserId : userId
		});
	}
	return serverSession;
});
