let loggedin = false;
let sessionid = null;

//
// The logout function should really hit a 'logout' API to tell the server to release
//  the session id.
//
function performLogout() {
    loggedin = false;
    sessionid = null;
}

// 
// The login function will (ajax) call the API using a 'PUT' (not GET, as it causes changes) with
//  the username / password in the body.   In the real world the app should at least be running using ssl
//  so that the username & password is encrypted. 
//
function performLogin(username,password) {
   $.post(  "http://localhost:3000/api/login",
            {username,password},
            loginCallback)
            .fail(function(jqXHR, textStatus, errorThrown) 
            {
                console.log("status",textStatus);
                console.log("error",errorThrown);
                console.log("jqXHR",jqXHR);
            });
}

//
// Gets the data back from the login api.   Checks the status on the login and either notifies the
//  user they didn't log in, or sets the loggedin/session variables.
//
function loginCallback(data, status, jqXHR) {   
    if (data.sessionId !== undefined) {
        loggedin = true;
        sessionid = data.sessionId;
        $("#log-status-text").text("Logged in, session id: " + sessionid);
    }
    else {
        $("#log-status-text").text("Not logged in; invalid username/password.");
    }
}

function toggleLogin() {
    if (loggedin) {
        performLogout();
    }
    else {       
        $("#login-modal-div").css("visibility","visible");
    }
}

function tryLogin(event) {
    event.preventDefault();
    username = $("#login-username-formtxt").val();
    password = $("#login-password-formtxt").val();
    performLogin(username,password);
    $("#login-modal-div").css("visibility","hidden");
}

$("#log-toggle-button").on("click",toggleLogin);
$("#login-form").on("submit",tryLogin);