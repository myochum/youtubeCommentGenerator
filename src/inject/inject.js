//@ sourceURL=inject.js

//Public key.
var OAUTH2_CLIENT_ID = 'AIzaSyDoiYgpHJxnCvIFFt_o0uhNLbSsYotLuog';
var videoId = /(?:\?v=)(.+)/.exec(window.location.search.split('&'))[1];
var queryURL = 'https://clients6.google.com/youtube/v3/commentThreads?part=snippet&videoId=' + videoId +
    '&key=' + OAUTH2_CLIENT_ID + '&maxResults=50&order=relevance&textFormat=plainText';

$.getJSON(queryURL, function(data) {
    //Sort through the data
    var corpusStr = '';
    var comments = data.items;
    for (var i = 0; i < comments.length; i++) {
        var comment = comments[i].snippet.topLevelComment.snippet.textDisplay;
        corpusStr += comment + ' ';
    }

    //......................Popup Message Send......................//
    chrome.runtime.sendMessage({ method: 'sendInfo', response: corpusStr });
});