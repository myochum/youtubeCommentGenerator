//@ sourceURL=inject.js

//Public key.
var OAUTH2_CLIENT_ID = 'AIzaSyDoiYgpHJxnCvIFFt_o0uhNLbSsYotLuog';

var makeTheCall = function() {
    var videoId = /(?:\?v=)(.+)/.exec(window.location.search.split('&'))[1];
    var queryURL = 'https://clients6.google.com/youtube/v3/commentThreads?part=snippet&videoId=' + videoId +
        '&key=' + OAUTH2_CLIENT_ID + '&maxResults=50&order=relevance&textFormat=plainText';
    $.getJSON(queryURL, function(data) {
        if (!data.items) {
            //Try again
            makeTheCall();
            return;
        }
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
}
makeTheCall();

//Listener for comment in Popup - maybe don't do this? kinda ugly
chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        console.log(sender.tab ?
            "from a content script:" + sender.tab.url :
            "from the extension");
        if (request.method == "sendComment") {
            //Do stuff
            window.location.hash = '#watch-discussion';
        } else if (request.method == 'doOver') {
            //Popup says we ain't got data so GET IT.
            makeTheCall();
        }
    });