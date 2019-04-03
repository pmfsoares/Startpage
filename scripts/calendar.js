var API_KEY, CLIENT_ID, SCOPES, EMAIL;
// Array of API discovery doc URLs for APIs used by the quickstart
var DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"];

var AuthFile = $.getJSON("./scripts/auth.json", function(data){
})
    .done(function(){
        CLIENT_ID = AuthFile.responseJSON.clientId;
        API_KEY = AuthFile.responseJSON.apiKey;
        SCOPES = AuthFile.responseJSON.scopes;
        EMAIL = AuthFile.responseJSON.email;
        if(AuthFile.responseJSON != ""){
            console.log("Sucessuful");
        }
    })
    .fail(function(){
        console.log("error");
    });

var authorizeButton = document.getElementById('auth-modal-signin');
/**
 *  On load, called to load the auth2 library and API client library.
 */
function handleClientLoad() {
    gapi.load('client:auth2', initClient);
}
/**
 *  Initializes the API client library and sets up sign-in state
 *  listeners.
 */
function initClient(){
    let config = {
        response_type: 'permission',
        scope: SCOPES,
        client_id: CLIENT_ID,
        login_hint: EMAIL
    };
    gapi.auth2.authorize(config, function(response){
        let config2 = {
            discoveryDocs: DISCOVERY_DOCS};
        gapi.client.init(config2).then(function(){
            listUpcomingEvents();
            console.log("test");
        });
    });
}

/**
 *  Called when the signed in status changes, to update the UI
 *  appropriately. After a sign-in, the API is called.
 */
function updateSigninStatus(isSignedIn) {
    if (isSignedIn) {
        return;
    } else {
        gapi.auth2.getAuthInstance().signIn();
    }
}

/**
 *  Sign in the user upon button click.
 */
function handleAuthClick(event) {
    gapi.auth2.getAuthInstance().signIn();
}

/**
 *  Sign out the user upon button click.
 */
function handleSignoutClick(event) {
    gapi.auth2.getAuthInstance().signOut();
}

/**
 * Append a pre element to the body containing the given message
 * as its text node. Used to display the results of the API call.
 *
 * @param {string} message Text to be placed in pre element.
 */
function listUpcomingEvents() {
    gapi.client.calendar.events.list({
        'calendarId': 'primary',
        'timeMin': (new Date()).toISOString(),
        'showDeleted': false,
        'singleEvents': true,
        'maxResults': 20,
        'orderBy': 'startTime'
    }).then(function(response) {
        var events = response.result.items;
        console.log(events);
        $('#calendar').empty();
        var pre = document.getElementById('calendar');
        if (events.length > 0) {
            for (i = 0; i < events.length; i++) {
                var event = events[i];
                var when = event.start.dateTime;
                if (!when) {
                    when = event.start.date;
                }
                ColorsFile.responseJSON.colors[event.colorId];
                $(`#calendar`).html($(`#calendar`).html()+`<li style="background-color: ${ColorsFile.responseJSON.colors[event.colorId].background}!important" class="list-group-item"><div class="event-name">${event.summary}</div>
<div class="event-details">${event.location}</div>
</li>`);
            }
        } else {
            console.log(`No upcoming events`);
        }
    });
}
var ColorsFile = $.getJSON("./scripts/colors.json", function(data){
 })
     .done(function(){
         colors = ColorsFile.responseJSON.colors;
         console.log(colors);
     })
     .fail(function(){
         console.log("error");
     });
