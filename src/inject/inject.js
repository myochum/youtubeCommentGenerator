//@ sourceURL=inject.js

//......................Make that chain......................//

var sendMessage = function() {

    //Get the things.
    function grabComments() {
        var videoId = /(?:\?v=)(.+)/.exec(window.location.search)[1];
        var request = gapi.client.youtube.commentThreads.list({
            videoId: 'r_Ua8iOR0g8',
            part: 'snippet',
            key: OAUTH2_CLIENT_ID
        });

        request.execute(function(response) {
            return response;
        });
    }
    debugger;
    response = grabComments();
    console.log(response);

    //......................Popup Message Send......................//
    chrome.runtime.sendMessage({ method: 'sendInfo', response: response });
}




//..................................JS FROM GOOGLE API TO INIT..................................//

// The client ID is obtained from the {{ Google Cloud Console }}
// at {{ https://cloud.google.com/console }}.
// If you run this code from a server other than http://localhost,
// you need to register your own client ID.
var OAUTH2_CLIENT_ID = 'AIzaSyDoiYgpHJxnCvIFFt_o0uhNLbSsYotLuog';
var OAUTH2_SCOPES = [
  'https://www.googleapis.com/auth/youtube'
];

// Upon loading, the Google APIs JS client automatically invokes this callback.
googleApiClientReady = function() {
  gapi.auth.init(function() {
    window.setTimeout(checkAuth, 1);
  });
}

// Attempt the immediate OAuth 2.0 client flow as soon as the page loads.
// If the currently logged-in Google Account has previously authorized
// the client specified as the OAUTH2_CLIENT_ID, then the authorization
// succeeds with no user intervention. Otherwise, it fails and the
// user interface that prompts for authorization needs to display.
function checkAuth() {
  gapi.auth.authorize({
    client_id: OAUTH2_CLIENT_ID,
    scope: OAUTH2_SCOPES,
    immediate: true
  }, handleAuthResult);
}

// Handle the result of a gapi.auth.authorize() call.
function handleAuthResult(authResult) {
  if (authResult && !authResult.error) {
    // Authorization was successful. Hide authorization prompts and show
    // content that should be visible after authorization succeeds.
    $('.pre-auth').hide();
    $('.post-auth').show();
    loadAPIClientInterfaces();
  } else {
    // Make the #login-link clickable. Attempt a non-immediate OAuth 2.0
    // client flow. The current function is called when that flow completes.
    $('#login-link').click(function() {
      gapi.auth.authorize({
        client_id: OAUTH2_CLIENT_ID,
        scope: OAUTH2_SCOPES,
        immediate: false
        }, handleAuthResult);
    });
  }
}

// Load the client interfaces for the YouTube Analytics and Data APIs, which
// are required to use the Google APIs JS client. More info is available at
// https://developers.google.com/api-client-library/javascript/dev/dev_jscript#loading-the-client-library-and-the-api
function loadAPIClientInterfaces() {
  gapi.client.load('youtube', 'v3', function() {
    sendMessage();
  });
}


//......................Main Functionality......................//

//Send initial message on page load.
//sendMessage();