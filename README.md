# ServerSideAuth

### Experiment in basic server side authentication

This is an experiment in coding a basic server side authentication scheme.   The repository contains a simple client website and a simple server.

The general flow of events is:

1. The user goes to the website.
2. The user clicks on the "Log in" button on the top left.
3. The login modal box is displayed.
4. The user types in a username/password, and clicks the modals 'log in'.  [For this example login is allowed when username=password]
5. The website passes the username password to the server/api.

	Note: As the password is being passed from client to server, this is vulnerable to eavesdropping / "man in the middle" type attacks.  See the ServerSideAuthII repository for one solution to that.
6. The server validates the username password in the API code. [If username=password, login is allowed]

	a) If the login information is valid the server returns a session id intended to be used with each subsequent transaction.
	
	b) If the login information is not valid the server returns an error message.  [A delay before returning anything can be used to make automated password guessing attacks a little less atractive]
	