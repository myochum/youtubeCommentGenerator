//......................Make The Comment......................//
chrome.runtime.sendMessage({ method: 'getInfo' }, function(response) {
    var markovComment = new markov(response, "string", /[.^\S]+ /g);

    //For random sentence ender character.
    var sentenceEnders = ['. ', '? ', '! ', ' '];

    //generate a random max i value and a random gen value to get different sentences.
    var outString = "";
    var phraseLength = Math.floor(Math.random() * 11) + 1;
    var callTime = Math.floor(Math.random() * 6) + 1;
    for (var i = 0; i < callTime; i++) {
        var sentenceEnder = sentenceEnders[Math.floor(Math.random() * 4)];
        //Generate a sentence and remove any extra white space.
        var sentence = markovComment.gen(phraseLength).replace(/^\s+|\s+$/g, '');
        outString += sentence + sentenceEnder;
    }
    console.log(outString);

    //Stick it in the popup.
    var commentNode = document.getElementById('popupComment');
    commentNode.innerHTML = outString;

    //Bind to comment button click.
    document.getElementById('commentButton').addEventListener('click', function() {
        //Send 'er in.
        var OAUTH2_CLIENT_ID = 'AIzaSyDoiYgpHJxnCvIFFt_o0uhNLbSsYotLuog';
        var videoId = /(?:\?v=)(.+)/.exec(window.location.search.split('&'))[1];
        var queryURL = 'https://clients6.google.com/youtube/v3/commentThreads?part=snippet&videoId=' + videoId +
            '&key=' + OAUTH2_CLIENT_ID + '&maxResults=50&order=relevance&textFormat=plainText';
            
    });
});